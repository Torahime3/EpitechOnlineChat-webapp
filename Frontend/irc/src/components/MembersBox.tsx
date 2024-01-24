import styles from '../styles/membersbox.module.css';
import Profile from "./Profile.tsx";

function MembersBox(){

    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.membersbox} ${styles.box}`}>
                    <div className={styles.title}>
                        <p>Membres du canal</p>
                    </div>

                    <Profile name={"Nathan"}/>
                    <Profile name={"Saïd"}/>
                    <Profile name={"Talal"}/>
                    <Profile name={"John"}/>


                </div>

                <div className={`${styles.box} ${styles.profile}`}>
                    <p>Truc utile à mettre ici</p>
                </div>
            </div>
        </>
    )

}

export default MembersBox