import axios from "axios";
import { BASE, GET_HISTORIAL, GET_THREADS } from "./urls";

export const getHistorial = async (threadId: string) => {
    const response = await axios({
        method: 'get',
        url: `${BASE}${GET_HISTORIAL}/${threadId}`,
    });

    return [...response.data].reverse();
}

export const getThreads = async () => {
    const response = await axios({
        method: 'get',
        url: `${BASE}${GET_THREADS}`,
    });

    return response.data;
}