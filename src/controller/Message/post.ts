import { Message } from "../../types/message"

const postMessage = async (conversationId: number, message: Message) => {

    return await fetch(`http://localhost:3005/messages/${conversationId}`, {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(json => console.log(json));
}

export default postMessage;
