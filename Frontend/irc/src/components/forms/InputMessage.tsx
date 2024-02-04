import { useCookies } from 'react-cookie';
import styles from '../../styles/inputmessage.module.css';
import { useState } from 'react';

function InputMessage({selectedChannel, executeCommand}: any) {

    const [cookie] = useCookies(['user']);
    const [messageContent, setMessageContent] = useState('');
    const [isCommand, setIsCommand] = useState(false);

    function handleSubmit(e: any){
        e.preventDefault();

        if (!messageContent.trim()) {
            return;
        }

        if(isCommand){
            const [command, ...args] = messageContent.slice(1).split(' ');
            executeCommand(command, args);
            setMessageContent('');
            return;
        }

        const message = {
            user_id: cookie.user._id,
            message_content: messageContent,
        };

        fetch("api/v1/messages/" + selectedChannel, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to send message');
                }
                return response.json();
            })
            .then(() => {
                setMessageContent('');
            })
            .catch((error) => {
                alert(error)
            });

    }

    function onInputChange(e: any){

        const input = e.target.value;
        setIsCommand(input.startsWith("/"));
        setMessageContent(input);
    }


    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <input
                onChange={onInputChange}
                name="content"
                className={`${styles.message_input} ${isCommand ? styles.command : ''}`}
                type="text"
                placeholder="Entrez votre message"
                value={messageContent}
            />
            <button name="submit" className={styles.submit_input} type="submit">➤</button>
        </form>
    );

}

export default InputMessage