import { Type } from '../../components/SystemChat';

export async function usersCommand(args: string[], selectedChannel: number, userCookie: string){

    try {
        const response = await fetch("api/v1/userChannels/channel/" + selectedChannel, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const users = await response.json();

        let usernames = "";
        usernames = String(users.map((user: any) => " - " + user.username).join("\n"));
        
    
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