import { Icon, IconProps } from '@chakra-ui/react'

export const LinkArrowIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            viewBox="0 0 15 16"
            fill="none"
        >
            <path
                d="M4.375 11.125L10.625 4.875"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.375 4.875H10.625V11.125"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Icon>
    )
}
