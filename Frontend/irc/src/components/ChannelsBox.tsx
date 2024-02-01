import styles from '../styles/membersbox.module.css';
import Channel from "./Channel.tsx";
import {useCookies} from "react-cookie";
import {Dispatch, SetStateAction} from "react";

interface Props{
    setSelectedChannel: Dispatch<SetStateAction<number>>;
    selectedChannel: number;
}

function ChannelsBox({ setSelectedChannel, selectedChannel }: Props){

    const[cookie, removeCookie] = useCookies(['user']);
    const channels = ["général","music","dev","animaux", "jeux", "films" ,"nourriture","sport","voyage","autre"]

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

                    {channels.map((channel, id) => (
                        <div onClick={() => handleChannelClick(id)} key={id}>
                            <Channel
                                name={channel}
                                id={id}
                                selected={selectedChannel === id}
                            />
                        </div>
                    ))}

                </div>

                <div className={`${styles.profile} ${styles.panel}`}>
                    <div>
                        <p>Username : {cookie.user.username}</p>
                        <p>Password : {cookie.user.password}</p>
                    </div>
                        <button className={`${styles.logout}`} onClick={() => handleLogout()}>Logout</button>
                </div>
            </div>
        </>
    )

}

export default ChannelsBox