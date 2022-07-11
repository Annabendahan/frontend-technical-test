import { Message } from "../../types/message"

const getMessagesByConversationId = async (conversationId: number): Promise<Error | Message> => {
    return await fetch(`http://localhost:3005/messages/${conversationId}`, {
        method: 'GET',
        headers: {
        },

    })
        .then((res) => res.json())

}

export default getMessagesByConversationId;
