
interface Props {
    name: string;
}

function Profile(props: Props){


    return (
        <div className={"channel_container"}>
            <p>{props.name}</p>
        </div>
    )
}

export default Profile