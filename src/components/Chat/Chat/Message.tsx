import { Box, Flex } from "@mantine/core"
import classes from './message.module.css';
import ReactMarkdown from "react-markdown";

type MessageProps = {
    role: 'USER' | 'AI' | 'AI_WRITING',
    isLoading: boolean,
    content: string
};

const Message = ({ role, content, isLoading }: MessageProps) => {
    return (
        <Flex gap={10}>
            {role.startsWith('AI')  ? '' : ''}
            <Flex className={`${classes.message} ${role === 'USER' ? classes.user : classes.ai}`}>
                {isLoading && role === 'AI_WRITING' ? <Box className={classes.loader}/> : 
                <Flex direction='column' className={classes.markdown}>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </Flex>
                }
            </Flex>
        </Flex>

    );
};

export default Message;