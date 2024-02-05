import { handleCommand } from '../scripts/handleCommand.ts';
import styles from '../styles/chatbox.module.css';
import Chat from "./Chat.tsx";
import SystemChat, { Type } from './SystemChat.tsx';
import InputMessage from "./forms/InputMessage.tsx";
import {useEffect, useState} from "react";

interface Props {
    selectedChannel: number;
}
function ChatBox({selectedChannel}: Props) {

    const[channelInfo, setChannelInfo] = useState({channel_name: "", channel_description: "", channel_creation_date: ""});
    const [messages, setMessages] = useState<any[]>([]);;
    const [loadingMessages, setLoadingMessages] = useState(true);
    const [helpChannel, setHelpChannel] = useState(false);

    useEffect(() => {


        if(selectedChannel === -1){
            setHelpChannel(true);
            return;
        }

        setHelpChannel(false);
        setMessages([]);
        setLoadingMessages(true);

        // FETCH CHANNELS INFO
        fetch("api/v1/channels/" + selectedChannel, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(request => request.json())
            .then((response) => {
                setChannelInfo(response)
            });

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

    console.log("composant reload")


    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.chatbox}`}>


                    <div className={styles.title}>
                        {/* <span> {channelInfo.channel_creation_date} </span> */}
                        <span> [#{channelInfo.channel_name}] </span>
                        <span>{channelInfo.channel_description}</span>
                    </div>

    

                    {helpChannel ? ( 
                        
                        <SystemChat 
                        title={"Bienvenue"}
                        message={"Bienvenue sur la discord app\n" +
                        "Pour commencer veuillez selectionner un salon sur la gauche.\n\n" +
                        "Liste de commandes : \n" +
                        "/nick <nickname> : Change votre pseudo\n" +
                        "/list [string] : Liste des channels disponible, si string est renseigné, liste les channels contenant la string\n" +
                        "/create <channel> : Crée un channel\n" +
                        "/join <channel> : Rejoindre un channel\n" +
                        "/quit : Quitte le channel\n" +
                        "/msg <user>"} 
                        type={Type.SUCCESS} />

                    ) : ( 
                    
                        loadingMessages ? (
                            <> </>
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
                                        type={message.message_type} />
                                    ) : ( 
                                        <Chat
                                        key={message.id}
                                        sender={message.sender_username}
                                        time={message.message_date}
                                        message={message.message_content}
                                    />
                                    )}
                                    

                                </div>
                            ))
                        )
                    
                    ) }

                </div>
                

                <div className={`${styles.input}`}>
                    <InputMessage selectedChannel={selectedChannel} executeCommand={executeCommand} />
                </div>
            </div>

        </>
    )

}

export default ChatBox