import { Box, PasswordInput, Popover, Progress, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";
import classes from './form.module.css'

const PasswordRequirement = ({ meets, label }: { meets: boolean; label: string }) => {
    return (
        <Text
        c={meets ? '#412498' : '#27155f'}
        style={{ display: 'flex', alignItems: 'center' }}
        mt={7}
        size="sm"
        >
            {meets ? <IconCheck size={14} /> : <IconX size={14} />}
            <Box ml={10}>{label}</Box>
        </Text>
    );
}

const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

const getStrength = (password: string) => {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
        multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

type PasswordProps = {
    handleValue: (value: string) => void
}

const Password = ({ handleValue }: PasswordProps) => {
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [value, setValue] = useState('');
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
    ));

    const strength = getStrength(value);
    const color ='#29185a';

    return (
        <Popover withArrow opened={popoverOpened} position="left" width="target" transitionProps={{ transition: 'pop' }}>
            <Popover.Target>
                <div
                onFocusCapture={() => setPopoverOpened(true)}
                onBlurCapture={() => setPopoverOpened(false)}
                >
                <PasswordInput
                    classNames={{ input: classes.input, required: classes.required, visibilityToggle: classes.visibilityToggle }}
                    withAsterisk
                    label="Your password"
                    value={value}
                    onChange={(event) => {handleValue(event.currentTarget.value); setValue(event.currentTarget.value)}}
                />
                </div>
            </Popover.Target>
            <Popover.Dropdown classNames={{ dropdown: classes.dropdown }}>
                <Progress color={color} value={strength} size={5} mb="xs" />
                <PasswordRequirement label="Includes at least 6 characters" meets={value.length > 5} />
                {checks}
            </Popover.Dropdown>
        </Popover>
    )
}

export default Password;