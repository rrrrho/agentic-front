import { Box, Flex, Loader } from "@mantine/core"
import Header from "../components/Chat/Chat/Header"
import Chat from "../components/Chat/Chat/Chat"
import classes from './chat.module.css'
import { socket } from "../services/socketio";
import { useEffect, useRef, useState } from "react";
import { deleteThread, getHistorial } from "../services/http_req";
import { useDispatch, useSelector } from "react-redux";
import type { IRootState } from "../redux/store";
import { addChat, removeChat, triggerRefresh } from "../redux/chatSlice";

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
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    
    const user = useSelector((state: IRootState) => state.user);

    const currentChat = useSelector((state: IRootState) => state.chat);
    
    const chatRef = useRef(currentChat);
    const prevThreadIdRef = useRef(currentChat.threadId);
    const messagesRef = useRef(messages);

    const handleDelete = async () => {
        await deleteThread(currentChat.threadId);
        dispatch(removeChat());
    }

    useEffect(() => { chatRef.current = currentChat; }, [currentChat]);
    useEffect(() => { messagesRef.current = messages; }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            const currentId = currentChat.threadId;
            const previousId = prevThreadIdRef.current;
            
            const hasMessagesLocally = messagesRef.current.length > 0;

            const isJustCreated = previousId === '' && currentId !== '' && hasMessagesLocally;

            if (isJustCreated) {
                console.log('chat just created');
            } 
            else if (currentId !== '' && currentId !== previousId) {
                try {
                    const data = await getHistorial(currentId);
                    setMessages(data);
                } catch (error) {
                    console.error('history err:', error);
                }
            } else if (currentId === '') {
                setMessages([]);
            }

            prevThreadIdRef.current = currentId;
        }

        fetchMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentChat.threadId]); 


    useEffect(() => {
        setIsLoading(true)
        const handleResponse = (data: AIResponse) => {
            const currentThreadId = chatRef.current.threadId;
            console.log(data)

            if (currentThreadId === '' && data.thread_id) {
                dispatch(addChat({
                    threadId: data.thread_id, 
                    title: data.title, 
                }));
                dispatch(triggerRefresh());
            }

            setMessages(prev => {
                const cleanPrev = prev.filter(m => m.role !== 'AI_WRITING');
                const lastMsg = cleanPrev[0];

                if (lastMsg && lastMsg.role === 'AI' && lastMsg.content === data.response) {
                    return cleanPrev;
                }

                const response: Message = {
                    id: crypto.randomUUID(),
                    role: 'AI',
                    content: data.response
                };
                return [response, ...cleanPrev];
            });
            
            setIsStarted(false);
        };

        const handleStatus = (data: Status) => {
            if (!isStarted && data.streaming) {
                const loading: Message = {
                    id: crypto.randomUUID(),
                    role: 'AI_WRITING',
                    content: ''
                };
                setMessages(prev => [loading, ...prev]);
                setIsStarted(true);
            };
        };

        const handleError = (data: unknown) => {
            setIsStarted(false);
            setMessages(prev => prev.filter(m => m.role !== 'AI_WRITING'));
        }

        socket.on('response', handleResponse);
        socket.on('status', handleStatus);
        socket.on('error', handleError);

        setIsLoading(false)

        return () => {
            socket.off('response', handleResponse);
            socket.off('status', handleStatus);
            socket.off('error', handleError);
        };
    }, []); 

    const handleSubmit = (message: string) => {
        const request: Message = {
            id: crypto.randomUUID(),
            role: 'USER',
            content: message
        };

        setMessages(prev => [request, ...prev]);

        const currentId = chatRef.current.threadId;
        const payload = currentId === '' 
            ? { message: message } 
            : { message: message, thread_id: currentId };

        socket.emit('chat', payload);
    }

    return (
        <>
        {isLoading ? (<Box className={classes.loadingContainer}><Loader/></Box> ) : ''}
        <Flex className={classes.chat}>
            <Header open={open} isActive={currentChat.threadId !== ''} title={currentChat.title} handleDelete={handleDelete}/>
            <Chat messages={messages} isWriting={isStarted} onSend={handleSubmit}/>
        </Flex></>
    )
}

export default IndividualChat;