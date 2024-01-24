import styles from '../../styles/membersbox.module.css';

function MembersBox(){

    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.membersbox} ${styles.box}`}>
                    <p>Membres du canal</p>
                    <br/>
                    <p>Nathan</p>
                    <p>Saïd</p>
                    <p>Talal</p>
                    <p>John</p>

                </div>

                <div className={`${styles.box} ${styles.profile}`}>
                    <p>Input</p>
                </div>
            </div>
        </>
    )

}

export default MembersBox