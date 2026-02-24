import { Box, Textarea } from "@mantine/core";
import { useState } from "react";
import classes from './input.module.css'
import { IconSend2 } from '@tabler/icons-react';

type InputProps = {
    handleSubmit: (message: string) => void
}

const Input = ({ handleSubmit }: InputProps) => {
    const [value, setValue] = useState('');

    const sendMessage = (message: string) => {
        handleSubmit(message);
        setValue('');
    }
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // send with enter
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); 
            sendMessage(value);
        }
    };

    return (
            <Textarea
            autosize
            minRows={1}
            maxRows={6}
            classNames={{ input: classes.input, section: classes.section }}
            placeholder='Say something...'
            value={value}
            rightSection={<IconSend2 onClick={() => {sendMessage(value)}}/>}
            onChange={(event) => setValue(event.currentTarget.value)}
            onKeyDown={handleKeyDown}
            />
    )
};

export default Input;