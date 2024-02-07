import styles from '../styles/message.module.css';

interface Props {
    sender: string;
    time?: string;
    message: string;
}

function Chat(props: Props){

    const time = props.time ? props.time.substring(11, 16) : "00";
    const day = props.time ? props.time.substring(8, 10) : "00";

    const messageData = {
        sender: props.sender,
        time: time,
        message: props.message,
    }

    return(
            <>
                <span className={styles.hour}>[{messageData.time}]</span> {messageData.sender}: {messageData.message}
            </>
    );

}

export default Chat;