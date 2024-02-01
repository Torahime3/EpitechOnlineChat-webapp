
interface Props {
    name: string;
}

function Profile(props: Props){


    return (
        <div className="panel">
            {/* <img className="profile_avatar" src="https://picsum.photos/200" alt="Avatar" /> */}
            <p>Username: {props.name}</p>
        </div>
    )
}

export default Profile