import { Type } from '../../components/SystemChat';
import { storeUserList, getUserList } from '../global';

async function getAllUsersByName() {
    try {
        const response = await fetch("api/v1/users/username", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        return result?.success && Array.isArray(result.result) ? result.result : [];
        
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        return [];
    }
}

export async function listCommand(args: string[], selectedChannel: any) {
    try {
        // Obtenir la liste des utilisateurs et la stocker
        storeUserList(await getAllUsersByName());
        const users = getUserList();
        console.log('Utilisateurs disponibles : ', users);

        
        const response = await fetch("api/v1/channels", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const channels = await response.json();

        console.log('Liste complète des canaux :', channels);

        // Filtrer les canaux en fonction de la liste des utilisateurs stockée
        const filteredChannels = channels.filter((channel: any) => {
            console.log('Noms d\'utilisateurs stockés : ', users);
            console.log('Nom du canal actuel : ', channel.channel_name);
            return !users.includes(channel.channel_name);
        });

        console.log('Canaux filtrés :', filteredChannels);

        const channelNames = String(filteredChannels.map((channel: any) =>
            " - # " + channel.channel_name + (channel._id === selectedChannel.id ? " (Actuel)" : "")
        ).join("\n"));

        return {
            title: "Channels disponibles" + (args.length > 0 ? " (Filtré par \"" + args[0] + "\")" : ""),
            result: channelNames,
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
