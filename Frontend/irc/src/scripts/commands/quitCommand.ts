import { Type } from '../../components/SystemChat';

export async function quitCommand(args: string[], selectedChannel: number, userCookie: string){

    try {
        const response = await fetch("api/v1/userChannels/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                channel_id: selectedChannel,
                user_id: userCookie,
            }),
        });

        const result = await response.json();

        return {
            title: "Quitting channel",
            result: "You have left the channel",
            type: Type.WARNING,
        }
        
    } catch (error) {
        return {
            title: "Error",
            result: String(error),
            type: Type.WARNING, 
        }
    }

}