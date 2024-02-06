import styles from '../styles/channelsbox.module.css';
import Channel from "./Channel.tsx";
import {useCookies} from "react-cookie";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import Profile from './Profile.tsx';

interface Props{
    setSelectedChannel: Dispatch<SetStateAction<number>>;
    selectedChannel: number;
}

function ChannelsBox({ setSelectedChannel, selectedChannel }: Props){

    const[cookie, removeCookie] = useCookies(['user']);
    const[channelsList, setChannelsList] = useState<any[]>([]);

    useEffect(() => {
        console.log(cookie.user._id);
        fetch("api/v1/userChannels/" + cookie.user._id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(request => request.json())
            .then((response) => {
                setChannelsList(response);
            });
    }, []);

    const addChannel = (channel: any) => {
        setChannelsList([...channelsList, channel]);
    }

    const removeChannel = (id: number) => {
        setChannelsList(channelsList.filter(channel => channel.channel_id !== id));
    }

    const handleChannelClick = (id: number) => {
        setSelectedChannel(id);
    }

    const handleLogout = () => {
        removeCookie('user', {path: '/'});
    }

    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.membersbox}`}>
                    <div className={styles.title}>
                        <p>Channels</p>
                    </div>

                    {channelsList.map((channel, id) => (
                        <div onClick={() => handleChannelClick(channel.channel_id)} key={id}>
                            <Channel
                                name={channel.channel_name}
                                id={channel.channel_id}
                                selected={selectedChannel === channel.channel_id}
                            />
                        </div>
                    ))}

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