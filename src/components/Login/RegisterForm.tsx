import { Anchor, Button, Fieldset, Flex, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import classes from './form.module.css'
import Password from "./Password";
import type { UserCreation } from "../../services/user_req";
import { IconMail, IconUser } from "@tabler/icons-react";

type RegisterFormProps = {
    onSubmit: (user: UserCreation) => void,
    sendToBack: () => void
}

const RegisterForm = ({ onSubmit, sendToBack }: RegisterFormProps) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        onSubmit({ email, name, password });
    }

    return (
        <Flex className={classes.container}>
            <Flex direction='column' align='center'>
                <Text fz='1.5rem'>Sign up</Text>
                <Text fz='0.8rem'>Already have an account? <Anchor onClick={sendToBack} c='violet'>Sign in</Anchor></Text>

            </Flex>
        <Fieldset className={classes.fieldset}>
            <TextInput label="Name"  
            rightSection={<IconUser color='rgba(223, 212, 255, 0.8' size={16}/>}
            minLength={2}
            classNames={{ input: classes.input }}
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            />
            <TextInput label="Email" type='email'
            rightSection={<IconMail color='rgba(223, 212, 255, 0.8' size={16}/>}
            classNames={{ input: classes.input }}
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            />
            <Password handleValue={setPassword}/>
            <Button className={ classes.button } onClick={handleSubmit}>Continue</Button>
        </Fieldset>
        </Flex>
    )
}

export default RegisterForm;