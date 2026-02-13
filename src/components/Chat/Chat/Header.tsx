import { Flex, Text } from "@mantine/core";
import classes from './header.module.css'
import { IconMenu3, IconArrowBack } from '@tabler/icons-react'
import { truncText } from "../../../utilities/string";
import { AnimatePresence, motion } from "motion/react";

type HeaderProps = {
    open: () => void,
    isActive: boolean,
    title: string
}

const Header = ({open, isActive, title}: HeaderProps) => {

    return (
        <AnimatePresence>
            {isActive ? (
                <motion.div
                key='header'
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 50 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ zIndex: 10 }}
                >
                    <Flex className={classes.header}>
                        <Flex gap={20} align='center'>
                        <IconArrowBack color='#5B00B5' size='2.5rem' onClick={() => {open()}}/>
                        <Flex direction='column' justify='center'>
                            
                            <Text fz='1.2rem'>{truncText(title)}</Text>
                        </Flex>
                        </Flex>
                        <IconMenu3 color='#5B00B5' size='2.5rem'/>
                    </Flex>
                </motion.div>
            ) : ''}
        </AnimatePresence>
        
    )
};

export default Header;