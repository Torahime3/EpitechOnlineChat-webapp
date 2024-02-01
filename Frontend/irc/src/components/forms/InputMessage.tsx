import { useCookies } from 'react-cookie';
import styles from '../../styles/inputmessage.module.css';

function InputMessage({selectedChannel}: any) {

    const [cookie] = useCookies(['user']);

    function handleSubmit(e: any){
        e.preventDefault();
        const message_content = new FormData(e.target).get('content');
        const message = {
            user_id: cookie.user._id,
            message_content: message_content,
        }

        fetch("api/v1/messages/" + selectedChannel, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        }).then(request => request.json()).then((response => {
            e.target.reset();
        })).catch((error) => {
            alert(error)
        });



    }


  return (
    <>
        <form className={styles.container} onSubmit={handleSubmit}>
            <input name="content" className={styles.message_input} type="text" placeholder="Entrez votre message"/>
            <button name="submit" className={styles.submit_input} type="submit">➤</button>
        </form>
    </>
    )}

export default InputMessage