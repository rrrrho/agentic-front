import { Box, Flex, Text } from "@mantine/core";
import classes from './header.module.css'
import { IconMenu3, IconArrowBack, IconHistoryToggle } from '@tabler/icons-react'
import { truncText } from "../../../utilities/string";
import { AnimatePresence, motion } from "motion/react";

type HeaderProps = {
    open: () => void,
    isActive: boolean,
    title: string
}

const Header = ({open, isActive, title}: HeaderProps) => {
    const isDesktop = window.innerWidth >= 1024;

    return (
<Flex className={classes.header}>
            <AnimatePresence>
                {isActive ? (
                    <motion.div
                        key='header'
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.9 } }} 
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        style={{ 
                            zIndex: 10, 
                            width: '100%', 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center' 
                        }}
                    >
                        <Flex gap={20} align='center'>
                        <Box className={classes.iconContainer}>
                            <IconArrowBack 
                                className={classes.path}
                                color='rgba(62, 30, 205, 0.8)'
                                size='2.5rem' 
                                strokeWidth='1.5px'
                                onClick={() => {open()}}
                                style={{ cursor: 'pointer' }}
                            />
                            <IconArrowBack 
                                strokeWidth='1.5px'
                                color='rgba(62, 30, 205, 0.8)'
                                size='2.5rem' 
                                onClick={() => {open()}}
                                style={{ cursor: 'pointer' }}
                            />
                        </Box>
                            <Flex direction='column' justify='center'>
                                <Text fz='1.2rem'>{isDesktop ? title : truncText(title)}</Text>
                            </Flex>
                        </Flex>
                        <Box className={classes.iconContainer}>
                            <IconMenu3 className={classes.path} size='2.5rem' strokeWidth='1.5px'/>
                            <IconMenu3 style={{ cursor: 'pointer' }} color='rgba(62, 30, 205, 0.8)' strokeWidth='1.5px' size='2.5rem'/>
                        </Box>
                        
                    </motion.div>
                ) : (
                        <motion.div
                        key='no-header'
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
                    >
                
                        <Box className={classes.iconContainer}>
                            <IconHistoryToggle className={classes.path} onClick={open} style={{ cursor: 'pointer' }} strokeWidth='1.5px' size='1.8rem' color='rgba(62, 30, 205, 0.8)'/>
                            <IconHistoryToggle onClick={open} style={{ cursor: 'pointer' }} strokeWidth='1.5px' size='1.8rem' color='rgba(62, 30, 205, 0.8)'/>
                        </Box>
                        
                        </motion.div>)
                }
            </AnimatePresence>
        </Flex>
        
    )
};

export default Header;