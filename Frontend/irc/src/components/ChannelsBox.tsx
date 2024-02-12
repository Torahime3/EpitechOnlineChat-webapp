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
        fetchChannels();

        socket.on('channel_' + cookie.user._id, () => {
            fetchChannels();
        });

        return () => {
            socket.off('channel_' + cookie.user._id);
        }
        
    }, []);

    useEffect(() => {
        console.log("selectedChannel.id: " + selectedChannel.id)
        if(selectedChannel.id === -1){
            setMembersList([]);
            return;
        }

        fetchMembers();
        const handleMembersEvent = () => {
            fetchMembers();
        };
    
        socket.on('members', handleMembersEvent);
    
        return () => {
            socket.off('members', handleMembersEvent);
        };

    }, [socket, selectedChannel]);

    const fetchMembers = () => {
        console.log(cookie.user.username);
        fetch("api/v1/userChannels/channel/" + selectedChannel.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(request => request.json())
            .then((response) => {
                setMembersList(response);
                console.log(response);
            });
    }

    const fetchChannels = () => {
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
                        <p>Channel{channelsList.length > 1 ? "s" : "" } | {channelsList.length} </p>
                    </div>

                    <div>
                        <button className={`${styles.create}`}>+ Créer un channel</button>
                        <button className={`${styles.join}`}>+ Rejoindre un channel</button>

                    </div>

                    {channelsList.map((channel, id) => (
                            <div onClick={() => handleChannelClick(channel)} key={id}>
                                <Channel
                                    channel={channel}
                                    selected={selectedChannel.id === channel.channel_id._id}
                                />
                            </div>
                        ))}

                </div>
                <div className={`${styles.membersbox}`}>
                    <div className={styles.title}>
                        <p>Membre{membersList.length > 1 ? "s" : ""} | {membersList.length} </p>
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
                    <div>
                        <button className={`${styles.rename}`}></button>
                        <button className={`${styles.logout}`} onClick={() => handleLogout()}></button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ChannelsBox