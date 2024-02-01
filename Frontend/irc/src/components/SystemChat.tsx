import styles from '../styles/message.module.css';

interface Props {
    time: string;
    message: string;
}

function Chat(props: Props){

    const time = props.time.substring(11, 16);
    const day = props.time.substring(6, 10);

    const messageData = {

        time: time,
        message: props.message,
    }

    return(
            <>
                <span className={styles.hour}>[{messageData.time}]</span> {messageData.message}
            </>
    );

}

export default Chat;