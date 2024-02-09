
interface Props {
    id: number;
    name: string;
    selected: boolean;
}

function Channel(props: Props){

    const style = props.selected ? "channel_container active" : "channel_container";

    return (
        <div className={style}>
            <p>{props.name}</p>
            <div className="icon">
                <button>X</button>
            </div>
        </div>
    )
}

export default Channel