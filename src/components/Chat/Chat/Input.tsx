import { TextInput } from "@mantine/core";
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
    
    return (
        <TextInput
        classNames={{ input: classes.input, section: classes.section }}
        placeholder='Say something...'
        value={value}
        rightSection={<IconSend2 onClick={() => {sendMessage(value)}}/>}
        onChange={(event) => setValue(event.currentTarget.value)}
        onKeyDown={(event) => event.key === 'Enter' && sendMessage(value)}
        />
    )
};

export default Input;