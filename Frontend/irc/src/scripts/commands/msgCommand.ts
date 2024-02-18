import { getUserInformation } from '../global';
import { Type } from '../../components/SystemChat';

export async function msgCommand(args: string[], userCookie: string): Promise<{ result: string; title: string; type?: Type | undefined; }> {
    const targetUserName = args[0];
    const message = args.slice(1).join(" ") || " ";
    const userInformation = getUserInformation();

    console.log('Target Username:', targetUserName);
    console.log('Message:', message);
    console.log('User Information:', userInformation);

    const targetUser = userInformation.find(user => user.username === targetUserName);

    if (!targetUser) {
        console.error('Utilisateur non trouvé');
        console.log('Informations de l\'utilisateur actuel :', userInformation);
        return { type: Type.WARNING, title: 'Erreur', result: 'Utilisateur non trouvé' };
    }

    const targetUserID = targetUser.user_id;

    try {
        const createChannelResponse = await fetch('/api/v1/channels/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                channel_name: targetUserName,
                channel_description: `Private channel for ${targetUserName}`,
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

        const response = await fetch('/api/v1/privateMessages/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender_id: userCookie,
                pm_message_content: message,
                target_id: targetUserID,
                channel_id: channelID,
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




