import { Type } from '../../components/SystemChat';

export async function quitCommand(args: string[], userCookie: string){

    if(args.length < 1){
        return {
            title: "Quit",
            result: "Vous devez spécifier le nom d'un channel pour quitter",
            type: Type.WARNING,
        }
    }
    
    const channelName = args[0];

    try {

        if(channelName.length == 0){
            return {
                title: "Quit",
                result: "Invalid number of arguments",
                type: Type.WARNING,
            }
        }
        const channelInfoResponse = await fetch(`/api/v1/channels/name/${channelName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!channelInfoResponse.ok) {
            console.error('Erreur lors de la récupération des informations du canal :', channelInfoResponse.statusText);
            return { type: Type.WARNING, title: 'Erreur', result: 'Le canal n\'\existe pas'};
        }

        const channelInfo = await channelInfoResponse.json();
        const channelId = channelInfo._id;

        const response = await fetch("/api/v1/userChannels/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                channel_id: channelId,
                user_id: userCookie,
            }),
        });

        if (!response.ok) {
            console.error('Erreur lors de la suppression de l\'utilisateur du canal :', response.statusText);
            return { type: Type.WARNING, title: 'Erreur', result: 'Erreur lors de la suppression de l\'utilisateur du canal' };
        }

        return {
            title: "Quitting channel",
            result: "You have left the channel",
            type: Type.WARNING,
        };
        
    } catch (error) {
        console.error('Erreur lors de la commande /quit :', error);
        return { type: Type.WARNING, title: 'Error', result: String(error) };
    }
}
