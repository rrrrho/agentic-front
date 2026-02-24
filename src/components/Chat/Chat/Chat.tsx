import { Box, Center, Flex } from "@mantine/core";
import Input from "./Input";
import type { Message as MessageType } from "../../../pages/IndividualChat";
import Message from "./Message";
import { AnimatePresence, motion } from "motion/react";
import classes from './chat.module.css'
import GradientText from "../../external/GradientText";

type ChatProps = {
    messages: MessageType[];
    isWriting: boolean;
    onSend: (msg: string) => void;
}

const Chat = ({ messages, isWriting, onSend }: ChatProps) => {
    const isEmpty = messages.length === 0;
    const isDesktop = window.innerWidth >= 1024;

    return (
        <Flex 
            direction='column' 
            px='1rem' 
            pb={isEmpty ? 0 : '3rem'}
            h='100%' 
            style={{ overflow: 'hidden', position: "relative" }}
        >
            <Box style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 0, overflowY: 'hidden' }}>
                <AnimatePresence mode='wait'>
                    {isEmpty ? (
                        <Center 
                            key='empty-state'
                            component={motion.div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            style={{ 
                                position: 'absolute', 
                                marginBottom: '15vh',
                                inset: 0, 
                                zIndex: 1,
                                opacity: 0.5 
                            }}
                        >

                            <GradientText>Where should we start?</GradientText>

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
                    justifyContent: 'center',
                    alignItems: isEmpty ? 'flex-start' : 'flex-end'
                }}
            >
                <motion.div 
                    animate={{ 
                        y: isEmpty ? -window.innerHeight / 2.3 : 0,
                        width: isEmpty ? (isDesktop ? '25%' : '80%') : (isDesktop ? '50%' : '100%'),
                    }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 80, 
                        damping: 20,
                        mass: 1
                    }}
                    style={{ 
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        transformPerspective: 1000,
                        backfaceVisibility: 'hidden',
                        WebkitFontSmoothing: 'subpixel-antialiased'
                    }}
                >
                    <Box w='100%' className={isEmpty ? classes.homeInput : classes.conversationInput}>
                        <Input handleSubmit={onSend}/>
                    </Box>
                </motion.div>
            </Box>
        </Flex>
    )
};

export default Chat;