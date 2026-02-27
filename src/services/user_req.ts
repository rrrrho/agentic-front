import { GET_TOKEN, GET_USER_PROFILE, USERS } from "./urls";
import { api } from "./axios_config";

export type UserCreation = {
    name: string,
    email: string,
    password: string
}

export type UserProfile = {
    name: string,
    email: string
}

export type UserLogin = {
    email: string,
    password: string
}

type Token = {
    access_token: string,
}

export const postUser = async (user: UserCreation) => {
    const response: Token = await api({
        method: 'post',
        url: `/${USERS}`,
        data: user
    });

    return response;
}

export const login = async (user: UserLogin) => {
    const formData = new URLSearchParams();
    
    formData.append('username', user.email); 
    formData.append('password', user.password);

    await api({
        method: 'post',
        url: `/${GET_TOKEN}`,
        data: formData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export const getUserProfile = async () => {

    const response = await api({
        method: 'get',
        url: `/${GET_USER_PROFILE}`
    });

    return response.data
}