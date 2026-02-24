import { Flex } from "@mantine/core"
import Header from "../components/Chat/Chat/Header"
import Chat from "../components/Chat/Chat/Chat"
import classes from './chat.module.css'
import { socket } from "../services/socketio";
import { useEffect, useRef, useState } from "react";
import { getHistorial } from "../services/http_req";
import { useDispatch, useSelector } from "react-redux";
import type { IRootState } from "../redux/store";
import { addChat } from "../redux/chatSlice";
import Grainient from "../components/external/Grainient";

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
    
    const chatRef = useRef(currentChat);
    const prevThreadIdRef = useRef(currentChat.threadId);
    const messagesRef = useRef(messages);

    useEffect(() => { chatRef.current = currentChat; }, [currentChat]);
    useEffect(() => { messagesRef.current = messages; }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            const currentId = currentChat.threadId;
            const previousId = prevThreadIdRef.current;
            
            const hasMessagesLocally = messagesRef.current.length > 0;

            const isJustCreated = previousId === '' && currentId !== '' && hasMessagesLocally;

            if (isJustCreated) {
                console.log("Chat recién creado: Evitando fetch para no borrar mensajes locales.");
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
        const handleResponse = (data: AIResponse) => {
            const currentThreadId = chatRef.current.threadId;

            if (currentThreadId === '' && data.thread_id) {
                dispatch(addChat({
                    threadId: data.thread_id, 
                    title: data.title, 
                    isNew: true
                }));
            }

            console.log(data)
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

        const handleError = (data: any) => {
            console.error("Socket Error:", data);
            setIsStarted(false);
            setMessages(prev => prev.filter(m => m.role !== 'AI_WRITING'));
        }

        socket.on('response', handleResponse);
        socket.on('status', handleStatus);
        socket.on('error', handleError);

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

    console.log(chatRef)

    return (
        <>
         <Grainient
         
            color1="#0b0016"
            color2="#1a0032"
            color3="#561382"
            timeSpeed={0.25}
            colorBalance={0}
            warpStrength={1}
            warpFrequency={5}
            warpSpeed={2}
            warpAmplitude={50}
            blendAngle={0}
            blendSoftness={0.05}
            rotationAmount={500}
            noiseScale={2}
            grainAmount={0.1}
            grainScale={2}
            grainAnimated={false}
            contrast={1.5}
            gamma={1}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={0.9}
        />
        <Flex className={classes.chat}>
            <Header open={open} isActive={currentChat.threadId !== ''} title={currentChat.title}/>
            <Chat messages={messages} isWriting={isStarted} onSend={handleSubmit}/>
        </Flex></>
    )
}

export default IndividualChat;