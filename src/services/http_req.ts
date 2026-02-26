import { api } from "./axios_config";
import { GET_HISTORIAL, THREADS } from "./urls";

export const getHistorial = async (threadId: string) => {
    const response = await api({
        method: 'get',
        url: `/${GET_HISTORIAL}/${threadId}`,
    });

    return [...response.data].reverse();
}

export const getThreads = async () => {
    const response = await api({
        method: 'get',
        url: `/${THREADS}`,
    });

    return response.data;
}

export const deleteThread = async (threadId: string) => {
    const response = await api({
        method: 'delete',
        url: `/${THREADS}/${threadId}`,
    });

    return response;
}