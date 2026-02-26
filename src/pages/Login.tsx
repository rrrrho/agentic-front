import { Flex, Text } from "@mantine/core"
import classes from './login.module.css'
import Form from "../components/Login/Form"
import { postUser, type User } from "../services/user_req"
import { useDispatch } from "react-redux"
import { addUser } from "../redux/userSlice"
import { useNavigate } from "react-router";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (user: User) => {
        postUser(user);
        dispatch(addUser({ name: user.name, email: user.email }));
        navigate('/chat');
    }

    return (
        <Flex className={classes.container}>
            <Flex bg='red' className={classes.titleContainer}>
                <Flex>
                    <Text>Welcome</Text>
                </Flex>
            </Flex>
            <Flex className={classes.formContainer}>
                <Form onSubmit={handleSubmit}/>
            </Flex>
        </Flex>

    )
}

export default Login