
interface Props {
    name: string;
}

function Profile(props: Props){


    return (
        <div className="panel">
            <p> {props.name}</p>
        </div>
    )
}

export default Profile