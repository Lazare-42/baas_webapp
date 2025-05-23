import { Icon, IconProps } from '@chakra-ui/react'

export const FilledLabelIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon
            {...props}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15.7 7.3L8.7 0.3C8.5 0.1 8.3 0 8 0H3C2.7 0 2.5 0.1 2.3 0.3L0.3 2.3C0.1 2.5 0 2.7 0 3V8C0 8.3 0.1 8.5 0.3 8.7L7.3 15.7C7.5 15.9 7.7 16 8 16C8.3 16 8.5 15.9 8.7 15.7L15.7 8.7C16.1 8.3 16.1 7.7 15.7 7.3ZM4 5C3.4 5 3 4.6 3 4C3 3.4 3.4 3 4 3C4.6 3 5 3.4 5 4C5 4.6 4.6 5 4 5Z"
                fill="currentColor"
                stroke="none"
            />
        </Icon>
    )
}
