import { Type } from '../components/SystemChat';

export async function handleCommand(command: string, args: string[], selectedChannel: number): Promise<{ result: string; title: string; type?: Type | undefined; }> {
    console.log("command: " + command + ", args: [" + args + "], selectedChannel: " + selectedChannel);

    switch (command) {

        case "list":

            try {
                const response = await fetch("api/v1/channels", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const channels = await response.json();
                const channelNames = String(channels.map((channel: any) => " - " + channel.channel_name + (channel._id === selectedChannel ? " (Actuel)" : "")).join("\n"));
                return {
                    result: channelNames,
                    title: "Channels disponibles",
                    type: Type.INFO,
                }
                
            } catch (error) {
                return {
                    result: String(error),
                    title: "Error",
                    type: Type.WARNING, 
                }
            }

        default:
            return {
                result: "Commande inconnue: " + command,
                title: "Erreur",
                type: Type.WARNING,
            }

    }
}