import { Icon, IconProps } from '@chakra-ui/react'
export const SendIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            fill="none"
        >
            <g clipPath="url(#clip0_25638_181332)">
                <path
                    d="M16.5 1.5L8.25 9.75"
                    stroke="CurrentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M16.5 1.5L11.25 16.5L8.25 9.75L1.5 6.75L16.5 1.5Z"
                    stroke="CurrentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_25638_181332">
                    <rect width="18" height="18" fill="white" />
                </clipPath>
            </defs>
        </Icon>
    )
}
