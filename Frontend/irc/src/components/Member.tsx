interface Props {
    member: any,
}

function Member({member}: Props) {

    const username = member.user_id.username;
    const connected = member.user_id.connected;
    const dot_style = "status_dot" + (connected ? " connected" : " disconnected");

    return (
        <div className="member_container">
            <div className={dot_style}>
            </div>
            <p>{username}</p>
        </div>
    );

}

export default Member;