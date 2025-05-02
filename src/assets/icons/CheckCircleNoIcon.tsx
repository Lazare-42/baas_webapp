import { Icon, IconProps } from '@chakra-ui/react'

export const CheckCircleNoIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon
            xmlns="http://www.w3.org/2000/svg"
            width="auto"
            {...props}
            viewBox="0 0 26 25"
            fill="none"
        >
            <path
                d="M22 12.08V13C21.9988 15.1564 21.3005 17.2547 20.0093 18.9818C18.7182 20.709 16.9033 21.9725 14.8354 22.5839C12.7674 23.1953 10.5573 23.1219 8.53447 22.3746C6.51168 21.6273 4.78465 20.2461 3.61096 18.4371C2.43727 16.628 1.87979 14.4881 2.02168 12.3363C2.16356 10.1846 2.99721 8.13631 4.39828 6.49706C5.79935 4.85781 7.69279 3.71537 9.79619 3.24013C11.8996 2.7649 14.1003 2.98232 16.07 3.85999"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M18 1L25 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M18 8L25 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </Icon>
    )
}
