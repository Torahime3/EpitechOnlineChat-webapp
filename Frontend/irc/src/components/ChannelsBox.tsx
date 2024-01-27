import styles from '../styles/membersbox.module.css';
import Channel from "./Channel.tsx";
import {useState} from "react";
import Profile from "./Profile.tsx";

function ChannelsBox(){

    const[selectedChannel, setselectedChannel] = useState(1);

    const channels = ["général","music","dev","animaux", "jeux", "films" ,"nourriture","sport","voyage","autre"]

    const handleChannelClick = (channelId: number) => {
        setselectedChannel(channelId)
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
                    <Profile name={"Nathan"}/>
                </div>
            </div>
        </>
    )

}

export default ChannelsBox