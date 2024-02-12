import { Type } from "../../components/SystemChat";

export async function helpCommand(){

     
    const message =  "Liste de commandes : \n" +
    "/nick <nickname> : Change votre pseudo\n" +
    "/list [string] : Liste des channels disponible, si string est renseigné, liste les channels contenant la string\n" +
    "/create <channel> : Crée un channel\n" +
    "/delete <channel> : Supprime un channel\n" +
    "/users : Liste les utilisateurs dans le channel\n" +
    "/join <channel> : Rejoindre un channel\n" +
    "/quit : Quitte le channel\n" +
    "/msg <user>";

    return {
        title: "Help",
        result: message,
        type: Type.SUCCESS,
    }

}