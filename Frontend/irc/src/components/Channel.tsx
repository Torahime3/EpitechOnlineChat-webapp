import { useCookies } from "react-cookie";
import { quitCommand } from "../scripts/commands/quitCommand";

interface Props {
    channel: any;
    selected: boolean;
}

function Channel(props: Props){

    const [cookie, removeCookie] = useCookies(['user']);
    const style = props.selected ? "channel_container active" : "channel_container";
    console.log(cookie.user._id);

    return (
        <div className={style}>
            <p>{props.channel.channel_id.channel_name}</p>
            <button onClick={() => quitCommand(props.channel, cookie.user._id)}>X</button>
        </div>
    )
}

export default Channel