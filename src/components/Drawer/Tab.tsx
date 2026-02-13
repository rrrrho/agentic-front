import { Button } from "@mantine/core";
import classes from './tab.module.css'
import { truncText } from "../../utilities/string";

type Thread = {
    id: string,
    title: string
}

type TabProps = {
    thread: Thread,
    onClick: (threadId: string, title: string) => void
}

const Tab = ({thread, onClick}: TabProps) => {

    return (
        <Button className={classes.tab} onClick={() => {onClick(thread.id, thread.title)}}>
            {truncText(thread.title, 26)}
        </Button>
    )
};

export default Tab;