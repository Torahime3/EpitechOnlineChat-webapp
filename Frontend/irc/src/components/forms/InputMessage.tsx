import styles from '../../styles/inputmessage.module.css';

function InputMessage() {


  return (
    <>
        <form className={styles.container} >
            <input className={styles.message_input} type="text" placeholder="Entrez votre message"/>
            <button className={styles.submit_input} type="submit">Send</button>
        </form>
    </>
    )}

export default InputMessage