import { USERS } from "./urls";
import { api } from "./axios_config";

export type User = {
    name: string,
    email: string,
    password: string
}

type Token = {
    access_token: string,
}

export const postUser = async (user: User) => {
    const response: Token = await api({
        method: 'post',
        url: `/${USERS}`,
        data: user
    });

    return response;
}