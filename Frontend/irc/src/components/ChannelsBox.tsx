import styles from '../styles/membersbox.module.css';
import Channel from "./Channel.tsx";
import {useState} from "react";
import {useCookies} from "react-cookie";

function ChannelsBox(){

    const[cookie, removeCookie] = useCookies(['user']);
    const[selectedChannel, setselectedChannel] = useState(1);
    const channels = ["général","music","dev","animaux", "jeux", "films" ,"nourriture","sport","voyage","autre"]

    const handleChannelClick = (channelId: number) => {
        setselectedChannel(channelId)
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

                    {channels.map((channel, id) => (
                        <div onClick={() => handleChannelClick(id)}>
                            <Channel
                                name={channel}
                                id={id}
                                selected={selectedChannel === id}
                            />
                        </div>
                    ))}

                </div>

                <div className={`${styles.profile}`}>
                    <p>Username : {cookie.user.username}</p>
                    <p>Password : {cookie.user.password}</p>
                    <button className="logout" onClick={() => handleLogout()}>Logout</button>
                </div>
            </div>
        </>
    )

}

export default ChannelsBox