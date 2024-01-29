import styles from '../styles/chatbox.module.css';
import Chat from "./Chat.tsx";
import InputMessage from "./forms/InputMessage.tsx";

function ChatBox() {


    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.chatbox}`}>
                    <Chat/>
                    <Chat/>
                    <Chat/>
                    <Chat/>
                    <Chat/>
                    <Chat/>
                </div>

                <div className={`${styles.input}`}>
                    <InputMessage/>
                </div>
            </div>

        </>
    )

}

export default ChatBox