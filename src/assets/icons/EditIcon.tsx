import { Icon, IconProps } from '@chakra-ui/react'

export const EditIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon
            {...props}
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M8 13.3343H14H8Z" fill="none" />
            <path
                d="M8 13.3343H14"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <path
                d="M11 2.33432C11.2652 2.0691 11.6249 1.9201 12 1.9201C12.1857 1.9201 12.3696 1.95668 12.5412 2.02776C12.7128 2.09883 12.8687 2.203 13 2.33432C13.1313 2.46564 13.2355 2.62154 13.3066 2.79312C13.3776 2.9647 13.4142 3.1486 13.4142 3.33432C13.4142 3.52004 13.3776 3.70393 13.3066 3.87551C13.2355 4.0471 13.1313 4.203 13 4.33432L4.66667 12.6677L2 13.3343L2.66667 10.6677L11 2.33432Z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </Icon>
    )
}
