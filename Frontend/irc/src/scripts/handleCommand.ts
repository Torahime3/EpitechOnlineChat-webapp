import { Type } from '../components/SystemChat';
import { listCommand } from './commands/listCommand';
import { nickCommand } from './commands/nickCommand';

export async function handleCommand(command: string, args: string[], selectedChannel: number, userCookie: string): Promise<{ result: string; title: string; type?: Type | undefined; }> {
    console.log("command: " + command + ", args: [" + args + "], selectedChannel: " + selectedChannel, "userCookie: " + userCookie);

    switch (command) {

        case "list":
            return listCommand(args, selectedChannel);
        case "nick":
            return nickCommand(args, userCookie);

        

        default:

            return {
                title: "Erreur",
                result: "Commande inconnue: " + command,
                type: Type.WARNING,
            }

    }
}