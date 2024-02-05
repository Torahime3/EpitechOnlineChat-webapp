import { Type } from '../../components/SystemChat';

export async function nickCommand(args: string[], userCookie: string){

    if(args.length === 0){
        return {
            title: "Erreur",
            result: "Vous devez spécifier un pseudo",
            type: Type.WARNING,
        }
    }

    if(args[0].length > 20){
        return {
            title: "Erreur",
            result: "Le pseudo ne peut pas dépasser 20 caractères",
            type: Type.WARNING,
        }
    }

    if(args[0].trim() === ""){
        return {
            title: "Erreur",
            result: "Le pseudo ne peut pas être vide",
            type: Type.WARNING,
        }
    }

    try {
        const response = await fetch("api/v1/users/" + userCookie, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                username: args[0] 
            }),
        });

        const data = await response.json();
        if(data.error){
            return {
                title: "Erreur",
                result: data.error,
                type: Type.WARNING,
            }
        }

        return {
            title: "Succès",
            result: "Votre pseudo a été changé pour " + args[0],
            type: Type.SUCCESS,
        }
    } catch (error) {
        return {
            title: "Erreur",
            result: String(error),
            type: Type.WARNING,
        }
    }

}