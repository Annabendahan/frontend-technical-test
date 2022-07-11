import { Conversation } from "../../types/conversation"

const postConversation = async (userId: number, conversation: Conversation) => {

    return await fetch(`http://localhost:3005/conversations/${userId}`, {
        method: "POST",
        body: JSON.stringify(conversation),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(res => {
            if (res.status !== 200) {
                return { error: "Oups ! Une erreur s'est produite" }
            } else {
                return res.json()
            }
        })
}

export default postConversation;