import { Type } from '../../components/SystemChat';

export async function joinCommand(args: string[], selectedChannel: number, userCookie: string){

    try{

        if(args.length !== 1){
            return {
                title: "Join",
                result: "Invalid number of arguments",
                type: Type.WARNING,
            }
        }

        const channelName = args[0];
        let channelId = 0; 

        console.log("Joining channel: " + channelName + " with id: " + channelId);

        const response = await fetch("api/v1/channels", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        
        data.forEach((channel: any) => {
            if(channel.channel_name === channelName){
                channelId = channel._id;
                console.log("channel existe")
            }
        });

        return {
            title: "Join",
            result: "data",
            type: Type.SUCCESS,
        }

    } catch (error) {
        return {
            title: "Join",
            result: "Error: " + error,
            type: Type.WARNING,
        }
    }

}