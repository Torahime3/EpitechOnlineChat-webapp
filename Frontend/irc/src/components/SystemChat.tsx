import React from 'react';
import styles from '../styles/message.module.css';


export enum Type{
    INFO = "#353942",
    SUCCESS = "#31522f",
    WARNING = "#522f2f",
}

interface Props {
    message: string,
    time?: string,
    type: Type;
}

function SystemChat(props: Props){

    const { message, time, type } = props;

    if(time){
        const formattedTime  = time.substring(11, 16);
        const formattedDay  = time.substring(6, 10);

        return(
            <>
                <div className={`${styles.system}`} style={{ backgroundColor: type }}>
                    <span className={styles.hour}>[{formattedTime}]</span>
                     {message.split('\n').map((line) => (
                        <>
                            {line}
                            <br />
                        </>
                    ))}
                </div>
            </>
        )

    }

    return(
            <>
                 <div className={`${styles.system}`} style={{ backgroundColor: type }}>
                    {message.split('\n').map((line) => (
                        <>
                            {line}
                            <br />
                        </>
                    ))}
                </div>
            </>
    );

}

export default SystemChat;