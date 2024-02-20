import { Type } from '../../components/SystemChat';
import { storeUserInformation } from '../global';

export async function usersCommand(selectedChannel: any){

    try {
        const response = await fetch("api/v1/userChannels/channel/" + selectedChannel.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const users = await response.json();

        let userInformation = users.map((user: any) => ({
            username: user.user_id.username,
            user_id: user.user_id._id,
        }));

        // Stockez ces informations dans une variable global.
        storeUserInformation(userInformation);

        let usernames = String(userInformation.map((user: any) => " - " + user.username).join("\n"));

        return {
            title: "Utilisateurs dans le channel",
            result: usernames,
            type: Type.INFO,
        };

    } catch (error) {
        return {
            title: "Error",
            result: String(error),
            type: Type.WARNING,
        };
    }

}