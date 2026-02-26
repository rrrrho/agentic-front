import {  Button, Fieldset, TextInput } from "@mantine/core";
import { useState } from "react";
import classes from './form.module.css'
import Password from "./Password";
import type { User } from "../../services/user_req";

type FormProps = {
    onSubmit: (user: User) => void
}

const Form = ({ onSubmit }: FormProps) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ email, name, password });
    }

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
            <Button onClick={handleSubmit}>Sign in</Button>
        </Fieldset>
    )
}

export default Form;