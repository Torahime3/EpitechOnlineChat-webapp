import styles from '../styles/profile.module.css';

interface Props {
    name: string;
}

function Profile({name}: Props){

    const profile = {
        name: name,
    }

    return (
        <div className={`${styles.container}`}>
            <p>{profile.name}</p>
        </div>
    )
}

export default Profile