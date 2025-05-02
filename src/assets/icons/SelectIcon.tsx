import { Icon, IconProps } from '@chakra-ui/react'

export const SelectIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="none"
            {...props}
        >
            <path
                d="M10.666 6.66666L7.99935 10.6667L5.33268 6.66666L10.666 6.66666Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1.33268 8.00001C1.33268 11.6819 4.31745 14.6667 7.99935 14.6667C11.6812 14.6667 14.666 11.6819 14.666 8.00001C14.666 4.31811 11.6812 1.33334 7.99935 1.33334C4.31745 1.33334 1.33268 4.31811 1.33268 8.00001Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Icon>
    )
}
