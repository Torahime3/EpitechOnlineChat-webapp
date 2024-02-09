import { handleCommand } from '../scripts/handleCommand.ts';
import styles from '../styles/chatbox.module.css';
import Chat from "./Chat.tsx";
import SystemChat, { Type } from './SystemChat.tsx';
import InputMessage from "./forms/InputMessage.tsx";
import {useEffect, useState} from "react";
import { socket } from "../socket.ts";
import ReactLoading from 'react-loading';

interface Props {
    selectedChannel: any;
}
function ChatBox({selectedChannel}: Props) {

    const [channelInfo, setChannelInfo] = useState({channel_name: "", channel_description: "", channel_creation_date: ""});
    const [messages, setMessages] = useState<any[]>([]);;
    const [loadingMessages, setLoadingMessages] = useState(true);

    useEffect(() => {

        setMessages([]);
        setLoadingMessages(true);

        if(selectedChannel.id === -1){
            setLoadingMessages(false);
            setMessages(prevMessages => [...prevMessages, { 
                message_title: "Bienvenue",
                message_content: "Bienvenue sur la discord app\n" +
                "Pour commencer veuillez selectionner un salon sur la gauche.\n\n" +
                "Liste de commandes : \n" +
                "/nick <nickname> : Change votre pseudo\n" +
                "/list [string] : Liste des channels disponible, si string est renseigné, liste les channels contenant la string\n" +
                "/create <channel> : Crée un channel\n" +
                "/users : Liste les utilisateurs dans le channel\n" +
                "/join <channel> : Rejoindre un channel\n" +
                "/quit : Quitte le channel\n" +
                "/msg <user>",
                message_type: Type.SUCCESS,
                system_chat: true,
            }]);
            console.log(messages)
            return;
        }
        
        setChannelInfo(selectedChannel);

        // FETCH MESSAGES INFO
        fetch("api/v1/messages/" + selectedChannel.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(request => request.json())
            .then((response) => {
                setMessages(response.result);
                setLoadingMessages(false);
            });

        //GET LIVE MESSAGES
        socket.on('message_' + selectedChannel.id, (message: any) => {
            const message_data = message.clientMessage[0];
            setMessages(prevMessages => [...prevMessages, { 
                sender_id: {
                    username: message_data.sender_id.username,
                },
                message_content: message_data.message_content,
                message_date: message_data.message_date,
                system_chat: message_data.system_chat,
            }]);
        });

        return () => {
            socket.off('message_' + selectedChannel.id);
        };
        
    }, [selectedChannel]);

    useEffect(() => {
        const chatbox = document.querySelector(`.${styles.chatbox}`);
        chatbox?.scrollTo(0, chatbox.scrollHeight);
    }, [messages]);

    async function executeCommand(command: string, args: string[], userCookie: string) {

        const response = await handleCommand(command, args, selectedChannel, userCookie) as { result: string, title: string, type: Type};
        setMessages(prevMessages => [...prevMessages, { 
            message_title: response.title,
            message_content: response.result,
            message_type: response.type,
            system_chat: true,
        }]);

    }


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
                            <> 
                            <div className={styles.empty_channel}>
                                <ReactLoading type={"spin"}/>
                            </div>
                            </>
                        ) : messages.length === 0 ? (
                            <div className={styles.empty_channel}>
                                <div className={styles.empty_face}> </div>
                                <p>Aucun message dans ce salon</p>
                            </div>
                        ) : (
                            messages.map((message) => (
                                <div className={styles.message_container}>

                                    {message.system_chat ? (
                                        <SystemChat 
                                        title={message.message_title}
                                        message={message.message_content} 
                                        type={message.message_type}  />
                                    ) : ( 
                                        <Chat
                                        key={message.id}
                                        sender={message.sender_id.username}
                                        time={message.message_date}
                                        message={message.message_content}
                                    />
                                    )}
                                    

                                </div>
                            ))
                        )}

                </div>
                

                <div className={`${styles.input}`}>
                    <InputMessage selectedChannel={selectedChannel} executeCommand={executeCommand} />
                </div>
            </div>

        </>
    )

}

export default ChatBox