import {  Anchor, Button, Fieldset, Flex, PasswordInput, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import classes from './form.module.css'
import type { UserLogin } from "../../services/user_req";
import { IconLockHeart, IconMail } from "@tabler/icons-react";

type LoginFormProps = {
    onSubmit: (user: UserLogin) => void,
    sendToBack: () => void
}

const LoginForm = ({ onSubmit, sendToBack }: LoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        onSubmit({ email, password });
    }

    return (
        <Flex className={classes.container}>
            <Flex direction='column' align='center'>
                <Text fz='1.5rem'>Sign in</Text>
                <Text fz='0.8rem'>Don't have an account? <Anchor onClick={sendToBack} c='violet'>Register</Anchor></Text>

            </Flex>
            
            <Fieldset className={classes.fieldset}>
            <TextInput label='Email' type='email'
            classNames={{ input: classes.input }}
            value={email}
            rightSection={<IconMail color='rgba(223, 212, 255, 0.8' size={16}/>}
            onChange={(event) => setEmail(event.currentTarget.value)}
            />
            <PasswordInput label='Password' classNames={{ input: classes.input, visibilityToggle: classes.visibilityToggle }} onChange={(event) => setPassword(event.currentTarget.value)}/>
            <Button className={classes.button} onClick={handleSubmit}>Continue</Button>
        </Fieldset>

        </Flex>
    

    )
}

export default LoginForm;