import styles from '../styles/channelsbox.module.css';
import Channel from "./Channel.tsx";
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import Profile from './Profile.tsx';
import { socket } from '../socket.ts';
import Member from './Member.tsx';


interface Props{
    setSelectedChannel: any;
    selectedChannel: any;
}

function ChannelsBox({ setSelectedChannel, selectedChannel }: Props){

    const[cookie, removeCookie] = useCookies(['user']);
    const[channelsList, setChannelsList] = useState<any[]>([]);
    const[membersList, setMembersList] = useState<any[]>([]);

    useEffect(() => {
        getChannels();

        socket.on('channel_' + cookie.user._id, () => {
            getChannels();
        });

        return () => {
            socket.off('channel_' + cookie.user._id);
        }
        
    }, []);

    useEffect(() => {
        if(selectedChannel.id === -1){
            setMembersList([]);
            return;
        }

        getMembers();

    }, [selectedChannel]);

    const getMembers = () => {
        // console.log("get members on channel: ", selectedChannel.id)
        fetch("api/v1/userChannels/channel/" + selectedChannel.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(request => request.json())
            .then((response) => {
                setMembersList(response);
            });
    }

    const getChannels = () => {
        fetch("api/v1/userChannels/" + cookie.user._id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(request => request.json())
            .then((response) => {
                    setChannelsList(response);
            });
    }

    const handleChannelClick = (channel: any) => {
        if(selectedChannel.id === channel.channel_id._id){
            return;
        }
        const data = {
            id: channel.channel_id._id,
            channel_name: channel.channel_id.channel_name,
            channel_description: channel.channel_id.channel_description,
            channel_creation_date: channel.channel_id.channel_creation_date
        }
        setSelectedChannel(data);
    }

    const handleLogout = () => {
        socket.emit("logout", cookie.user.token);
        removeCookie('user', {path: '/'});
        
    }

    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.channelsbox}`}>
                    <div className={styles.title}>
                        <p>Channels | {channelsList.length} </p>
                    </div>

                   
                    <div className={`${styles.scroll}`}>
                        {channelsList.map((channel, id) => (
                            <div onClick={() => handleChannelClick(channel)} key={id}>
                                <Channel
                                    name={channel.channel_id.channel_name}
                                    id={channel.channel_id}
                                    selected={selectedChannel.id === channel.channel_id._id}
                                />
                            </div>
                        ))}
                    </div>

                </div>
                <div className={`${styles.membersbox}`}>
                    <div className={styles.title}>
                        <p>Membres | {membersList.length} </p>
                    </div>

                    <div className={`${styles.scroll}`}>
                        {membersList.map((member, id) => (
                            <div key={id}>
                                <Member member={member}/>
                            </div>
                        ))}
                    </div>
                
                </div>

                <div className={`${styles.profile} ${styles.panel}`}>
                    <Profile name={cookie.user.username}/>
                    <button className={`${styles.logout}`} onClick={() => handleLogout()}>Logout</button>
                </div>
            </div>
        </>
    )

}

export default ChannelsBox