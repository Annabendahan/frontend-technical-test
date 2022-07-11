import { User } from "../../types/user"

const getUserById = async (userId: number): Promise<Error | User> => {
    return await fetch(`http://localhost:3005/user/${userId}`, {
        method: 'GET',
        headers: {
        },

    })
        .then((res) => res.json())
}

export default getUserById;
