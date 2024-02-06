import { Type } from '../components/SystemChat';
import { joinCommand } from './commands/joinCommand';
import { listCommand } from './commands/listCommand';
import { nickCommand } from './commands/nickCommand';
import { quitCommand } from './commands/quitCommand';
import { usersCommand } from './commands/usersCommand';

export async function handleCommand(command: string, args: string[], selectedChannel: number, userCookie: string): Promise<{ result: string; title: string; type?: Type | undefined; }> {
    console.log("command: " + command + ", args: [" + args + "], selectedChannel: " + selectedChannel, "userCookie: " + userCookie);

    switch (command) {

        case "list":
            return listCommand(args, selectedChannel);
        case "nick":
            return nickCommand(args, userCookie);
        case "users":
            return usersCommand(args, selectedChannel, userCookie);
        case "quit":
            return quitCommand(args, selectedChannel, userCookie);
        case "join":
            return joinCommand(args, selectedChannel, userCookie);

        

        default:

            return {
                title: "Erreur",
                result: "Commande inconnue: " + command,
                type: Type.WARNING,
            }

    }
}