import { Icon, IconProps } from '@chakra-ui/react'

export const CodeIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M16 18L22 12L16 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <path
                d="M8 6L2 12L8 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                strokeLinejoin="round"
            />
        </Icon>
    )
}
