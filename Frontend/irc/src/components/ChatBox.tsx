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

    useEffect(() => {
        setChannelInfo({
            channel_creation_date: "[No channel selected]",
            channel_name: "",
            channel_description: "",
        });

        setMessages([]);

        if(selectedChannel === -1){
            return;
        }
        // FETCH MESSAGES INFO
        fetch("api/v1/messages/" + selectedChannel, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(request => request.json())
            .then((response) => {
                setMessages(response.result);
                console.log(response.result);
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

                    {messages.map((message) => (
                        <Chat 
                            sender={message.sender_username} 
                            time={message.message_date}
                            message={message.message_content}/>
                    ))}

                </div>
                

                <div className={`${styles.input}`}>
                    <InputMessage/>
                </div>
            </div>

        </>
    )

}

export default ChatBox