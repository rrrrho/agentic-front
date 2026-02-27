import { Flex, Text } from "@mantine/core"
import classes from './login.module.css'
import { getUserProfile, login, type UserLogin } from "../services/user_req"
import { useDispatch } from "react-redux"
import { addUser } from "../redux/userSlice"
import { useNavigate } from "react-router";
import LoginForm from "../components/Login/LoginForm"
import Stack from "../components/external/CardRotate"
import RegisterForm from "../components/Login/RegisterForm"
import Welcome from "../components/Home/Welcome"

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (user: UserLogin) => {
        await login(user);
        const profile = await getUserProfile();
        dispatch(addUser({ name: profile.name, email: profile.email }));
        navigate('/chat');
    }

    return (
        <Flex className={classes.container}>
            <Flex className={classes.titleContainer}>
                <Welcome/>
            </Flex>

            
            <Flex className={classes.formContainer}>
                <Stack
                randomRotation={false}
                sensitivity={200}
                sendToBackOnClick={false}
                cards={[
                    (sendToBack) => (<LoginForm onSubmit={handleSubmit} sendToBack={sendToBack}/>), 
                    (sendToBack) => (<RegisterForm onSubmit={handleSubmit} sendToBack={sendToBack}/>)
                ]}
                autoplay={false}
                autoplayDelay={3000}
                pauseOnHover={false}
            />
                
            </Flex>
        </Flex>

    )
}

export default Home;