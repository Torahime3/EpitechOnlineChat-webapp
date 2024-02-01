import styles from '../styles/message.module.css';

interface Props {
    sender: string;
    time: string;
    message: string;
}

function Chat(props: Props){

    const messageData = {
        sender: props.sender,
        time: props.time,
        message: props.message,
    }

    return(
        <div className={`${styles.container}`}>
            <span className={styles.hour}>[{messageData.time}]</span> {messageData.sender}: {messageData.message}
        </div>
    );

}

export default Chat;