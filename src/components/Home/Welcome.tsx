import { Flex, Text } from "@mantine/core";
import classes from './welcome.module.css'

const Welcome = () => {
    return (
        <Flex direction='column' ml='2rem' w='80%' className={ classes.container }>
            <Text fz='4rem'>Welcome to AI</Text>
            <Text>Move beyond the limits of static training. Our AI connects directly to the web and your databases to provide a conversational experience with fresh, real-world context. 
                <br/><br/>
                Get the answers you need, powered by today’s data.</Text> 
        </Flex>
    )
};

export default Welcome;