import { Icon, IconProps } from '@chakra-ui/react'

export const SRTIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon
            {...props}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8.85707 27.4286H23.1428C24.5629 27.4286 25.7142 26.2773 25.7142 24.8571V12.7794C25.7142 12.0974 25.4433 11.4434 24.9611 10.9611L18.7531 4.75315C18.2708 4.27092 17.6168 4 16.9348 4H8.85707C7.43691 4 6.28564 5.15127 6.28564 6.57143V24.8571C6.28564 26.2773 7.43691 27.4286 8.85707 27.4286Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
            />
            <line
                x1="10.1428"
                y1="14.4297"
                x2="17.2857"
                y2="14.4297"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <line
                x1="10.1428"
                y1="19"
                x2="21.2857"
                y2="19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <line
                x1="10.1428"
                y1="23.5703"
                x2="21.2857"
                y2="23.5703"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </Icon>
    )
}
