import { Icon, IconProps } from '@chakra-ui/react'

export const UnWrappedIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            style={{ transform: 'rotate(90deg)' }}
        >
            <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Icon>
    )
}
