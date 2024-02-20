import { Type } from '../../components/SystemChat';


export async function listCommand(args: string[], selectedChannel: any){

    try {
        const response = await fetch("api/v1/channels", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const channels = await response.json();

        let channelNames = "";
        if(args.length > 0){
            // If the user has entered an argument, we will filter the channels
            const filteredChannels = channels.filter((channel: any) => channel.channel_name.includes(args[0]));
            channelNames = String(filteredChannels.map((channel: any) => " - # " + channel.channel_name + (channel._id === selectedChannel.id ? " (Actuel)" : "")).join("\n"));
        } else {
            channelNames = String(channels.map((channel: any) => " - # " + channel.channel_name + (channel._id === selectedChannel.id ? " (Actuel)" : "")).join("\n"));
        }
        
        return {
            title: "Channels disponibles" + (args.length > 0 ? " (Filtré par \"" + args[0] + "\")" : ""),
            result: channelNames,
            type: Type.INFO,
        }
        
    } catch (error) {
        return {
            title: "Error",
            result: String(error),
            type: Type.WARNING, 
        }
    }

}