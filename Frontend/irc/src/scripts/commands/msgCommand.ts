import { Type } from '../../components/SystemChat';

export async function msgCommand(args: string[], userCookie: string): Promise<{ result: string; title: string; type?: Type | undefined; }> {
    
    const targetUserName = args[0];
    const message = args.slice(1).join(" ") || " ";

    try {
        const currentUserResponse = await fetch(`/api/v1/users/${userCookie}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!currentUserResponse.ok) {
            console.error('Erreur lors de la récupération de l\'utilisateur actuel :', currentUserResponse.statusText);
            return { type: Type.WARNING, title: 'Erreur', result: 'Erreur lors de la récupération de l\'utilisateur actuel' };
        }

        const currentUserData = await currentUserResponse.json();

        // Assurez-vous que currentUserData.result contient les informations de l'utilisateur
        const currentUser = currentUserData.result;

        if (!currentUser) {
            console.error('Utilisateur actuel non trouvé dans la réponse :', currentUserData);
            return { type: Type.WARNING, title: 'Erreur', result: 'Utilisateur actuel non trouvé dans la réponse' };
        }

        const currentUserName = currentUser.username;

        console.log('Target Username:', targetUserName);
        console.log('Message:', message);
        console.log('User Information:', currentUser);

        // Récupérer l'ID de l'utilisateur cible à partir du nom d'utilisateur
        const targetUserResponse = await fetch(`/api/v1/users/username/${targetUserName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!targetUserResponse.ok) {
            console.error('Erreur lors de la récupération de l\'utilisateur cible :', targetUserResponse.statusText);
            return { type: Type.WARNING, title: 'Erreur', result: 'Erreur lors de la récupération de l\'utilisateur cible' };
        }
        
        const targetUserData = await targetUserResponse.json();
        
        // Assurez-vous que targetUserData.result contient l'ID de l'utilisateur cible
        const targetUserID = targetUserData.result[0];
        
        if (!targetUserID) {
            console.error('ID de l\'utilisateur cible non trouvé dans la réponse :', targetUserData);
            return { type: Type.WARNING, title: 'Erreur', result: 'ID de l\'utilisateur cible non trouvé dans la réponse' };
        }

        // Créer le nom du canal en utilisant les noms d'utilisateur
        const userNames = [currentUserName, targetUserName].sort();
        const channelName = `${userNames[0]} - ${userNames[1]}`;
        
        console.log('User Sender:', currentUserName);

        const createChannelResponse = await fetch('/api/v1/channels/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                channel_name: channelName,
                channel_description: `Private channel for ${targetUserName}`,
                is_private: true,
            }),
        });

        if (!createChannelResponse.ok) {
            console.error('Erreur lors de la création du canal :', createChannelResponse.statusText);
            return { type: Type.WARNING, title: 'Erreur', result: 'Erreur lors de la création du canal' };
        }

        const createdChannel = await createChannelResponse.json();
        const channelID = createdChannel._id;

        console.log('Channel ID:', channelID);

        const addUserToChannelResponse1 = await fetch('/api/v1/userChannels/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userCookie,
                channel_id: channelID,
            }),
        });

        if (!addUserToChannelResponse1.ok) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur actuel au canal :', addUserToChannelResponse1.statusText);
            return { type: Type.WARNING, title: 'Erreur', result: 'Erreur lors de l\'ajout de l\'utilisateur actuel au canal' };
        }

        const addUserToChannelResponse2 = await fetch('/api/v1/userChannels/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: targetUserID,
                channel_id: channelID,
            }),
        });

        if (!addUserToChannelResponse2.ok) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur cible au canal :', addUserToChannelResponse2.statusText);
            return { type: Type.WARNING, title: 'Erreur', result: 'Erreur lors de l\'ajout de l\'utilisateur cible au canal' };
        }

        const response = await fetch(`/api/v1/messages/${channelID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userCookie,
                message_content: message,
            }),
        });

        if (response.ok) {
            return { type: Type.SUCCESS, title: 'Succès', result: 'Message privé envoyé avec succès' };
        } else {
            console.error('Erreur lors de l\'enregistrement du message privé :', response.statusText);
            return { type: Type.WARNING, title: 'Erreur', result: 'Erreur lors de l\'enregistrement du message privé' };
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message privé :', error);
        return { type: Type.WARNING, title: 'Erreur', result: 'Erreur lors de l\'envoi du message privé' };
    }
}