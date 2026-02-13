import { Drawer, Flex, Text } from "@mantine/core";
import Tab from "./Tab";
import classes from './drawer.module.css';
import { useDispatch } from "react-redux";
import { addChat } from "../../redux/chatSlice";
import { useEffect, useState } from "react";
import { getThreads } from "../../services/http_req";
import { IconNewSection } from '@tabler/icons-react'

type DrawerProps = {
    open: () => void,
    close: () => void,
    opened: boolean
}

const CustomDrawer = ({close, opened}: DrawerProps) => {
    const dispatch = useDispatch();
    const [chats, setChats] = useState<[]>([])

    const handleClick = (threadId: string, title: string) => {
        dispatch(addChat({threadId: threadId, title: title}))

        close()
    }

    const handleNewChat = () => {
        dispatch(addChat({threadId: '', title: ''}))

        close()
    }

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const data = await getThreads();
            
                setChats(data.threads); 
            } catch (error) {
                console.error('fetching chats err:', error);
            };
        };

        fetchChats();
    }, [])


    return (
         <Drawer.Root size={'15rem'} opened={opened} onClose={close} classNames={{ root: classes.root }}>
            <Drawer.Overlay/>
            <Drawer.Content  classNames={{ content: classes.content }}>
            <Drawer.Header classNames={{ header: classes.header }}>
                <Flex gap={8} p={'0.8rem 0.5rem'} align={'center'} onClick={handleNewChat}>
                    <IconNewSection size={'1.3rem'}/>
                    <Text>New chat</Text>
                </Flex>
            </Drawer.Header>
            <Drawer.Body classNames={{ body: classes.body }}>
                <Drawer.Title c="#EEDEFF" p={'0.8rem 0.5rem'}>Conversations</Drawer.Title>
                {chats.map((thread, i) => {
                    if (chats.length > 1) {

                        if (i === chats.length - 1) {
                            return <Tab onClick={handleClick} thread={thread}/>
                        }

                        return (
                            <><Tab onClick={handleClick} thread={thread} /></>
                        )
                    }

                    return <Tab onClick={handleClick} thread={thread}/>
                }
                
                
                )}

            </Drawer.Body>
            </Drawer.Content>
      </Drawer.Root>

    );
};

export default CustomDrawer;