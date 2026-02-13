import { Flex } from "@mantine/core"
import Header from "../components/Chat/Chat/Header"
import Chat from "../components/Chat/Chat/Chat"
import classes from './chat.module.css'
import { socket } from "../services/socketio";
import { useEffect, useState } from "react";
import { getHistorial } from "../services/http_req";
import { useDispatch, useSelector } from "react-redux";
import type { IRootState } from "../redux/store";
import { addChat } from "../redux/chatSlice";

export type AIResponse = {
    response: string;
    streaming: boolean;
    thread_id: string;
    title: string
}

export type Message = {
    id: string;
    role: 'USER' | 'AI' | 'AI_WRITING';
    content: string;
}

export type Status = {
    streaming: boolean;
}

type IndividualChatProps = {
    open: () => void
}

const IndividualChat = ({open}: IndividualChatProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isStarted, setIsStarted] = useState(false);
    const dispatch = useDispatch();
    const currentChat = useSelector((state: IRootState) => state.chat);
    
    useEffect(() => {
        const fetchMessages = async () => {
            const isEmpty = currentChat.threadId === '';

            if (!isEmpty) {
                try {
                    const data = await getHistorial(currentChat.threadId);
                    
                    setMessages(data); 
                } catch (error) {
                    console.error('history err:', error);
                }
            } else {
                setMessages([])
            }
        }


        fetchMessages();
    }, [currentChat])

    socket.on('response', (data: AIResponse) => {

        setThreadId(data.thread_id)

        setMessages((prev) => {
            const id = prev[0]?.id || crypto.randomUUID();

            const response: Message = {
                id: id,
                role: 'AI',
                content: data.response
            };
            return [response, ...prev.slice(1)];
        })

        if (currentChat.threadId === '') {
            dispatch(addChat({threadId: data.thread_id, title: data.title}))
        }
        
        console.log(currentChat)    
        setIsStarted(false);
    })

    socket.on('status', (data: Status) => {
        if (!isStarted && data.streaming) {
            const loading: Message = {
                id: crypto.randomUUID(),
                role: 'AI_WRITING',
                content: ''
            };
            const updatedMessages = [loading, ...messages];
            setMessages(updatedMessages);
            setIsStarted(true);
        };
    })

    const handleSubmit = (message: string) => {
        const request: Message = {
            id: crypto.randomUUID(),
            role: 'USER',
            content: message
        };
        const updatedMessages = [request, ...messages];
        setMessages(updatedMessages);

        const payload = currentChat.threadId === '' ? { message: message } : { message: message, thread_id: currentChat.threadId }

        socket.emit('chat', payload);
    }

    return (
        <Flex className={classes.chat}>
            <Header open={open} isLoading={isStarted} title={currentChat.title}/>
            <Chat messages={messages} isWriting={isStarted} onSend={handleSubmit}/>
        </Flex>
    )
};

export default IndividualChat;