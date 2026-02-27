import { Button } from "@mantine/core";
import classes from './tab.module.css';

type Thread = {
    _id: string,
    title: string
}

type TabProps = {
    thread: Thread,
    onClick: (threadId: string, title: string) => void
}

const Tab = ({thread, onClick}: TabProps) => {

    return (
        <Button className={classes.tab} classNames={{ label: classes.tabLabel }} onClick={() => {onClick(thread._id, thread.title)}}>
            {thread.title}
        </Button>
    )
};

export default Tab;