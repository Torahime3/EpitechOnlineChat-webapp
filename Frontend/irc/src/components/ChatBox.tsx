import styles from '../styles/chatbox.module.css';
import Chat from "./Chat.tsx";
import InputMessage from "./forms/InputMessage.tsx";
import {useEffect, useState} from "react";

interface Props {
    selectedChannel: number;
}
function ChatBox({selectedChannel}: Props) {

    const[channelInfo, setChannelInfo] = useState({
        channel_creation_date: "Loading...",
        channel_name: "Loading...",
        channel_description: "Loading...",
    
    });

    const [messages, setMessages] = useState<any[]>([]);;
    const [loadingMessages, setLoadingMessages] = useState(true);


    useEffect(() => {
 
        setMessages([]);

        if(selectedChannel === -1){
            return;
        }

        setLoadingMessages(true);


        // FETCH MESSAGES INFO
        fetch("api/v1/messages/" + selectedChannel, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(request => request.json())
            .then((response) => {
                setMessages(response.result);
                setLoadingMessages(false);
            });

        // FETCH CHANNELS INFO
        fetch("api/v1/channels/" + selectedChannel, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(request => request.json())
            .then((response) => {
                setChannelInfo({
                    channel_creation_date: response.channel_creation_date,
                    channel_name: response.channel_name,
                    channel_description: response.channel_description,

                })
            });
        
    }, [selectedChannel]);

    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.chatbox}`}>
                    <div className={styles.title}>
                        {/* <span> {channelInfo.channel_creation_date} </span> */}
                        <span> [#{channelInfo.channel_name}] </span>
                        <span>{channelInfo.channel_description}</span>
                    </div>


                    {loadingMessages ? (
                        <div className={styles.loading}>
                            <p>Loading messages...</p>
                         </div>
                    ) : messages.length === 0 ? (
                        <div className={styles.empty_channel}>
                            <div className={styles.empty_face}> </div>
                            <p>Aucun message dans ce salon</p>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <div className={styles.message_container}>
                                <Chat
                                    key={message.id} // Add a unique key for each message
                                    sender={message.sender_username}
                                    time={message.message_date}
                                    message={message.message_content}
                                />
                            </div>
                        ))
                    )}

                </div>
                

                <div className={`${styles.input}`}>
                    <InputMessage/>
                </div>
            </div>

        </>
    )

}

export default ChatBox