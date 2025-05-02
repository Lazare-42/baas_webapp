import { Icon, IconProps } from '@chakra-ui/react'

export const Mp4Icon: React.FC<IconProps> = (props) => {
    return (
        <Icon
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M8.85707 27.4286H23.1428C24.5629 27.4286 25.7142 26.2773 25.7142 24.8571V12.7794C25.7142 12.0974 25.4433 11.4434 24.9611 10.9611L18.7531 4.75315C18.2708 4.27092 17.6168 4 16.9348 4H8.85707C7.43691 4 6.28564 5.15127 6.28564 6.57143V24.8571C6.28564 26.2773 7.43691 27.4286 8.85707 27.4286Z"
                stroke="CurrentColor"
                strokeWidth="1.71429"
                fill="none"
            />
            <g clipPath="url(#clip0)">
                <path
                    d="M12.0715 22.9698V13.6016C12.0715 12.917 12.8345 12.5087 13.4041 12.8884L20.4303 17.5725C20.9392 17.9118 20.9392 18.6596 20.4303 18.9989L13.4041 23.683C12.8345 24.0628 12.0715 23.6544 12.0715 22.9698Z"
                    fill="CurrentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0">
                    <rect
                        width="12.5714"
                        height="12.5714"
                        fill="none"
                        transform="translate(9.71436 12)"
                    />
                </clipPath>
            </defs>
        </Icon>
    )
}
