import { Conversation } from "../../types/conversation"

const getConversationsByUserId = async (userId: number): Promise<Error | Conversation> => {
    return await fetch(`http://localhost:3005/conversations/${userId}`, {
        method: 'GET',
        headers: {
        },
    })
        .then(res => {
            if (res.status !== 200) {
                return { error: "Oups ! Une erreur s'est produite" }
            } else {
                return res.json()
            }
        })

}

export default getConversationsByUserId;
