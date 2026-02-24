import axios from "axios";
import { BASE, GET_HISTORIAL, THREADS } from "./urls";

export const getHistorial = async (threadId: string) => {
    const response = await axios({
        method: 'get',
        url: `${BASE}/${GET_HISTORIAL}/${threadId}`,
    });

    return [...response.data].reverse();
}

export const getThreads = async () => {
    const response = await axios({
        method: 'get',
        url: `${BASE}/${THREADS}`,
    });

    return response.data;
}

export const deleteThread = async (threadId: string) => {
    const response = await axios({
        method: 'delete',
        url: `${BASE}/${THREADS}/${threadId}`,
    });

    return response;
}