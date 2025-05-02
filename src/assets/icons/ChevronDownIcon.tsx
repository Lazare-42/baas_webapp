import { Icon, IconProps } from '@chakra-ui/react'

export const ChevronDownIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Icon>
    )
}
