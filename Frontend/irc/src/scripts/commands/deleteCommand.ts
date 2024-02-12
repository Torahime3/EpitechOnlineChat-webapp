import { Type } from '../../components/SystemChat';

export async function deleteCommand(args: string[], userCookie : string) {
    const channelName = args[0];

    try {
        const response = await fetch(`/api/v1/channels/name/${channelName}`);
        const existingChannel = await response.json();

        if (!existingChannel) {
            return { title: 'Erreur', result: `Le canal "${channelName}" n'existe pas.`, type: Type.WARNING };
        }

        const channelId = existingChannel._id;

        const deleteResponse = await fetch(`/api/v1/channels/${channelId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            
            body: JSON.stringify({
                user_id: userCookie,
            })
        });

        return deleteResponse.ok
            ? { title: 'Canal supprimé', result: `Le canal "${channelName}" a été supprimé avec succès.`, type: Type.SUCCESS }
            : { title: 'Erreur', result: `Erreur lors de la suppression du canal "${channelName}".`, type: Type.WARNING };

    } catch (error) {
        return { title: 'Erreur', result: String(error), type: Type.WARNING };
    }
}





