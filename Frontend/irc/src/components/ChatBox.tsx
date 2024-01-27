import styles from '../styles/chatbox.module.css';
import Message from "./Message.tsx";
import InputMessage from "./forms/InputMessage.tsx";

function ChatBox() {


    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.chatbox}`}>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                </div>

                <div className={`${styles.input}`}>
                    <InputMessage/>
                </div>
            </div>

        </>
    )

}

export default ChatBox