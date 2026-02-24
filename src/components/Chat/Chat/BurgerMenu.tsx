import { Menu } from "@mantine/core";
import { type ReactNode } from "react";
import { IconX,IconEdit } from '@tabler/icons-react';
import classes from './burger.module.css'

type BurgerMenuProps = {
    children: ReactNode;
    handleDelete: () => void;
}

const BurgerMenu = ({ children, handleDelete }: BurgerMenuProps) => {

    return (
        <Menu classNames={{ dropdown: classes.dropdown, item: classes.item, arrow: classes.arrow}} withArrow>
            <Menu.Target>
                {children}
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item leftSection={<IconX size={14} />} onClick={handleDelete}>
                    Delete
                </Menu.Item>
                <Menu.Item leftSection={<IconEdit size={14} />}>
                    Rename
                </Menu.Item>
        
            </Menu.Dropdown>
        </Menu>
    );

}

export default BurgerMenu;