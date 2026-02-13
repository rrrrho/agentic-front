import { Box, Center, Flex, Text } from "@mantine/core";
import Input from "./Input";
import type { Message as MessageType } from "../../../pages/IndividualChat";
import Message from "./Message";
import { AnimatePresence, motion } from "motion/react";
import classes from './chat.module.css'

type ChatProps = {
    messages: MessageType[];
    isWriting: boolean;
    onSend: (msg: string) => void;
}

const Chat = ({ messages, isWriting, onSend }: ChatProps) => {
    const isEmpty = messages.length === 0;

    return (
        <Flex 
            direction='column' 
            px='1rem' 
            h='100%' 
            style={{ overflow: 'hidden', position: "relative" }}
        >
            <Box style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 0, overflowY: 'hidden' }}>
                <AnimatePresence mode='wait'>
                    {isEmpty ? (
                        <Center 
                            key='empty-state'
                            component={motion.div}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            style={{ 
                                position: 'absolute', 
                                inset: 0, 
                                zIndex: 1,
                                opacity: 0.5 
                            }}
                        >
                            <Flex direction="column" align="center" gap={2} c={'#EEDEFF'}>
                                <Text size="xl" fw={500}>¿Por dónde deberíamos empezar?</Text>
                                <Text size="sm">Escribe tu primer mensaje abajo</Text>
                            </Flex>
                        </Center>
                    ) : (
                        <motion.div
                            key='message-list'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            
                            className={classes.chat}
                        >
                            {messages.map(m => (
                                <Box key={m.id} maw={'75%'} style={m.role === 'USER' ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }}>
                                    <Message isLoading={isWriting} role={m.role} content={m.content}/>
                                </Box>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>

            <Box 
                pb='1rem' 
                pt='1rem'
                style={{ 
                    position: 'relative',
                    zIndex: 2,
                    height: '80px', 
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <motion.div 
                    animate={{ 
                        y: isEmpty ? -window.innerHeight / 3 : 0 
                    }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 80, 
                        damping: 20,
                        mass: 1
                    }}
                    style={{ 
                        width: '100%',
                        transformPerspective: 1000,
                        backfaceVisibility: 'hidden',
                        WebkitFontSmoothing: 'subpixel-antialiased'
                    }}
                >
                    <Input handleSubmit={onSend}/>
                </motion.div>
            </Box>
        </Flex>
    )
};

export default Chat;