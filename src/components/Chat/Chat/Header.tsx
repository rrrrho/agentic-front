import { Flex, Text } from "@mantine/core";
import classes from './header.module.css'
import { IconMenu3, IconArrowBack } from '@tabler/icons-react'
import { truncText } from "../../../utilities/string";

type HeaderProps = {
    open: () => void,
    title: string,
    isLoading: boolean
}


const Header = ({open, title, isLoading}: HeaderProps) => {

    return (
        <Flex className={classes.header}>
            <Flex gap={20} align='center'>
            <IconArrowBack color='#5B00B5' size='2.5rem' onClick={() => {open()}}/>
            <Flex direction='column' justify='center'>
                
                <Text fz='1.2rem'>{truncText(title)}</Text>
            </Flex>
            </Flex>
            <IconMenu3 color='#5B00B5' size='2.5rem'/>
        </Flex>
    )
};

export default Header;