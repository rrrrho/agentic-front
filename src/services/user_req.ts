import axios from "axios";
import { BASE, USERS } from "./urls";

type User = {
    name: string,
    email: string,
    password: string
}

export const postUser = async (user: User) => {
    const response = await axios({
        method: 'post',
        url: `${BASE}/${USERS}`,
        data: user
    });

    return response;
}