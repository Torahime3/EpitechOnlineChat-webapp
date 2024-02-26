import { useCookies } from "react-cookie";
import { quitCommand } from "../scripts/commands/quitCommand";

interface Props {
    channel: any;
    selected: boolean;
}

function Channel(props: Props){

    const [cookie] = useCookies(['user']);
    let style = props.selected ? "channel_container active" : "channel_container";
    if(props.channel.channel_id.is_private){
        style = "channel_container private";
    }
    
    return (
        <div className={style}>
            <p>{props.channel.channel_id.channel_name}</p>
            {props.channel.channel_id.is_private ? null : <button onClick={() => quitCommand([props.channel.channel_id.channel_name], cookie.user._id)}>X</button>}
        </div>
    )
}

export default Channel