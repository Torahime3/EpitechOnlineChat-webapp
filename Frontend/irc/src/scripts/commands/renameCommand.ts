import { Type } from '../../components/SystemChat';

export async function renameCommand(args: string[], userCookie: string) {
    try {
        if (!args || args.length < 3) {
            return { type: Type.WARNING, title: 'Erreur', result: 'Veuillez fournir le nom actuel, le nouveau nom et la description du canal.' };
        }

        const currentChannelName = args[0];
        const newChannelName = args[1];
        const channelDescription = args.slice(2).join(' ');

        const response = await fetch(`/api/v1/channels/name/${currentChannelName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            return { type: Type.WARNING, title: 'Erreur', result: `Erreur lors de la récupération du canal : ${errorMessage}` };
        }

        const channelInfo = await response.json();
        const channelId = channelInfo._id;

        const updateResponse = await fetch(`/api/v1/channels/${channelId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                channel_name: newChannelName,
                channel_description: channelDescription,
                user_id: userCookie,
            }),
        });

        if (!updateResponse.ok) {
            const errorMessage = await updateResponse.text();
            return { type: Type.WARNING, title: 'Erreur', result: `Erreur lors du renommage du canal : ${errorMessage}` };
        }

        return { type: Type.SUCCESS, title: 'Succès', result: `Le canal a été renommé en ${newChannelName} avec la description : ${channelDescription}.` };

    } catch (error) {
        console.error('Erreur lors de la commande /rename :', error);
        return { type: Type.WARNING, title: 'Erreur', result: 'Erreur lors de la commande /rename' };
    }
}
