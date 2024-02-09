import { Type } from "../../components/SystemChat";

export async function createCommand(args: any){

    if(args.length < 1){
        return { 
            title: "Erreur",
            result: "La commande create nécessite un argument",
            type: Type.WARNING,
        }
    }

    const name = args[0];
    const description = args.slice(1).join(" ") || " "

    const response = await fetch("api/v1/channels/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            channel_name: name,
            channel_description: description,
        }),
    });

    if(response.ok){
        return {
            title: "Create",
            result: "Channel created: " + name,
            type: Type.SUCCESS,
        }
    } else {
        return {
            title: "Erreur",
            result: "Erreur lors de la création du channel",
            type: Type.WARNING,
        }
    }


}