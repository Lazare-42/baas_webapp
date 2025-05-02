import { Icon, IconProps } from '@chakra-ui/react'

export const LightningIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon
            {...props}
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_8861_9761)">
                <path
                    d="M13.2597 6.00661H8.30061L9.50282 1.32215C9.72824 0.325451 8.82658 -0.471904 8.22548 0.325451L2.21443 8.29901C1.7636 8.89703 2.06415 9.99339 2.74039 9.99339H7.69951L6.4973 14.6779C6.27188 15.6745 7.17354 16.4719 7.77465 15.6745L13.7857 7.70099C14.2365 7.10298 13.936 6.00661 13.2597 6.00661Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0_8861_9761">
                    <rect width="16" height="16" fill="white" />
                </clipPath>
            </defs>
        </Icon>
    )
}
