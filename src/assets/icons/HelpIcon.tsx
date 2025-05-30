import { Icon, IconProps } from '@chakra-ui/react'

export const HelpIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 17H12.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.09003 8.99996C9.32513 8.33163 9.78918 7.76807 10.4 7.40909C11.0108 7.05012 11.7289 6.9189 12.4272 7.03867C13.1255 7.15844 13.7588 7.52148 14.2151 8.06349C14.6714 8.60549 14.9211 9.29148 14.92 9.99996C14.92 12 11.92 13 11.92 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Icon>
    )
}
