import { Icon, IconProps } from '@chakra-ui/react'

export const PlusIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M8 3.33325V12.6666"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.3335 8H12.6668"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Icon>
    )
}
