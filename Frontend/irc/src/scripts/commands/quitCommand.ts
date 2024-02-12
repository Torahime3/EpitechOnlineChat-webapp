import { Type } from '../../components/SystemChat';

export async function quitCommand(selectedChannel: any, userCookie: string){

    console.log("selectedChannel: " + selectedChannel._id + ", userCookie: " + userCookie)
    try {
        const response = await fetch("api/v1/userChannels/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                channel_id: selectedChannel.id || selectedChannel._id,
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