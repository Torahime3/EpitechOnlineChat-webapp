import { Type } from '../../components/SystemChat';

export async function joinCommand(args: string[], userCookie: string){

    try{

        /*if(args.length !== 1){
            return {
                title: "Join",
                result: "Invalid number of arguments",
                type: Type.WARNING,
            }
        }*/

        const channelName = args[0];
        let channelId = 0; 

        const response = await fetch("api/v1/channels", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        
        let success = false;
        data.forEach(async (channel: any) => {

            if(channel.channel_name === channelName){

                success = true;
                channelId = channel._id;
                console.log("Joining channel: " + channelName + " with id: " + channelId);
                console.log("channel existe")
                console.log(userCookie);

                const req = await fetch("/api/v1/userChannels/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: userCookie,
                        channel_id: channelId,
                    }),
                });
            }
        });

        if(success){
            return {
                title: "Join",
                result: "Joining channel: " + channelName,
                type: Type.SUCCESS,
            }
        } else {
            return {
                title: "Erreur",
                result: "Le channel n'existe pas" ,
                type: Type.WARNING,
            }
        }

    } catch (error) {
        return {
            title: "Erreur",
            result: String(error),
            type: Type.WARNING,
        }
    }

}