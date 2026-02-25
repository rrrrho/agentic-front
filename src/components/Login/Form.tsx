import { Box, Button, Fieldset, PasswordInput, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import classes from './form.module.css'
import { IconCheck, IconX } from "@tabler/icons-react";
import Password from "./Password";

const Form = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Fieldset className={classes.fieldset}>
            <TextInput label="Your name" placeholder="Your name" minLength={2}
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            />
            <TextInput label="Email" placeholder="Email" type='email'
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            />
            <Password handleValue={setPassword}/>
            <Button>Sign in</Button>
        </Fieldset>
    )
}

export default Form;