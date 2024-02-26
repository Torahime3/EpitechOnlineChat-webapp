import { Type } from '../components/SystemChat';
import { createCommand } from './commands/createCommand';
import { deleteCommand } from './commands/deleteCommand';
import { helpCommand } from './commands/helpCommand';
import { joinCommand } from './commands/joinCommand';
import { listCommand } from './commands/listCommand';
import { nickCommand } from './commands/nickCommand';
import { quitCommand } from './commands/quitCommand';
import { usersCommand } from './commands/usersCommand';
import { msgCommand } from './commands/msgCommand';
import { renameCommand } from './commands/renameCommand';

export async function handleCommand(command: string, args: string[], selectedChannel: number, userCookie: string): Promise<{ result: string; title: string; type?: Type | undefined; }> {
    console.log("command: " + command + ", args: [" + args + "], selectedChannel: ",selectedChannel, "userCookie: " + userCookie);

    switch (command) {

        case "help":
            return helpCommand();
        case "list":
            return listCommand(args, selectedChannel);
        case "nick":
            return nickCommand(args, userCookie);
        case "users":
            return usersCommand(selectedChannel);
        case "quit":
            return quitCommand(args, userCookie);
        case "join":
            return joinCommand(args, userCookie);
        case "create":
            return createCommand(args);
        case "delete":
            return deleteCommand(args, userCookie);
        case "msg":
            return msgCommand(args, userCookie);
        case "rename":
            return renameCommand(args, userCookie);

        default:

            return {
                title: "Erreur",
                result: "Commande inconnue: " + command,
                type: Type.WARNING,
            }

    }
}