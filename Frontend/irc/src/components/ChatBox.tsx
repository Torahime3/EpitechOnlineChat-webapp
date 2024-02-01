import styles from '../styles/chatbox.module.css';
import Chat from "./Chat.tsx";
import InputMessage from "./forms/InputMessage.tsx";

interface Props {
    selectedChannel: number;
}
function ChatBox({selectedChannel}: Props) {


    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.chatbox}`}>
                    <div className={styles.title}>
                        <span>{selectedChannel} - </span>
                        <span>Description du channel</span>
                    </div>
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