import { Flex, Text } from "@mantine/core"
import classes from './login.module.css'
import Form from "../components/Login/Form"

const Login = () => {
    return (
        <Flex className={classes.container}>
            <Flex bg='red' className={classes.titleContainer}>
                <Flex>
                    <Text>Welcome</Text>
                </Flex>
            </Flex>
            <Flex className={classes.formContainer}>
                <Form/>
            </Flex>
        </Flex>

    )
}

export default Login