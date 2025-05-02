import { Icon, IconProps } from '@chakra-ui/react'

export const ClickupLogo: React.FC<IconProps> = (props) => {
    return (
        <Icon
            width="100%"
            height="auto"
            viewBox="0 0 130 155"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g clipPath="url(#clip0_19941_153542)">
                <path
                    d="M0 118.96L23.81 100.72C36.46 117.23 49.9 124.84 64.86 124.84C79.74 124.84 92.8 117.32 104.88 100.94L129.03 118.74C111.6 142.36 89.94 154.84 64.86 154.84C39.86 154.84 17.99 142.44 0 118.96V118.96Z"
                    fill="url(#paint0_linear_19941_153542)"
                />
                <path
                    d="M64.78 39.68L22.4 76.2L2.81 53.48L64.87 0L126.44 53.52L106.76 76.16L64.78 39.68Z"
                    fill="url(#paint1_linear_19941_153542)"
                />
            </g>
            <defs>
                <linearGradient
                    id="paint0_linear_19941_153542"
                    x1="0"
                    y1="137.527"
                    x2="129.03"
                    y2="137.527"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#8930FD" />
                    <stop offset="1" stopColor="#49CCF9" />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_19941_153542"
                    x1="2.81"
                    y1="51.8236"
                    x2="126.44"
                    y2="51.8236"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#FF02F0" />
                    <stop offset="1" stopColor="#FFC800" />
                </linearGradient>
                <clipPath id="clip0_19941_153542">
                    <rect width="129.03" height="154.84" fill="white" />
                </clipPath>
            </defs>
        </Icon>
    )
}
