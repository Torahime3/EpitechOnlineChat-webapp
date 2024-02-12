import { Type } from '../../components/SystemChat';

export async function deleteCommand(args: string[], userCookie : string) {
    const channelName = args[0];

    try {

        // Effectuer une requête GET pour obtenir les informations du canal par le nom
        const response = await fetch(`/api/v1/channels/name/${channelName}`);
        const existingChannel = await response.json();

        if (!existingChannel) {
            return { title: 'Erreur', result: `Le canal "${channelName}" n'existe pas.`, type: Type.WARNING };
        }

        const channelId = existingChannel._id;

        // Utiliser l'ID pour effectuer la requête DELETE
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





