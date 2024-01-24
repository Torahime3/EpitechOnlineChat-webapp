import styles from '../styles/message.module.css';

function Message(){

    const messageData = {
        message: "Message de test pour tester le text wrap css en fonction de la taille de l'écran,",
        sender: "John",
        time: "12:00"
    }

    return(
        <div className={`${styles.container}`}>
            <span className={styles.hour}>[{messageData.time}]</span> {messageData.sender}: {messageData.message}
        </div>
    );

}

export default Message;