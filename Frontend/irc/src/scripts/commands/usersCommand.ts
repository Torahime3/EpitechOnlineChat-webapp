import { Type } from '../../components/SystemChat';

export async function usersCommand(selectedChannel: any){

    try {
        const response = await fetch("api/v1/userChannels/channel/" + selectedChannel.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const users = await response.json();

        let usernames = "";
        usernames = String(users.map((user: any) => " - " + user.user_id.username).join("\n"));
        
    
        return {
            title: "Utilisateurs dans le channel",
            result: usernames,
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