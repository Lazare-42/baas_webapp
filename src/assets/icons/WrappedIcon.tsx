import { Icon, IconProps } from '@chakra-ui/react'

export const WrappedIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            viewBox="0 0 20 20"
            fill="none"
        >
            <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Icon>
    )
}
