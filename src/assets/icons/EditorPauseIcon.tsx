import { Icon, IconProps } from '@chakra-ui/react'

export const EditorPauseIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon
            {...props}
            viewBox="0 0 7 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0.786344 9H2.06948C2.5882 9 2.85574 8.73498 2.85574 8.22115V0.778846C2.85574 0.254207 2.5882 0.00540865 2.06948 0H0.786344C0.267629 0 8.19187e-05 0.265024 8.19187e-05 0.778846V8.22115C-0.00537824 8.73498 0.262169 9 0.786344 9ZM4.93606 9H6.21374C6.73245 9 7 8.73498 7 8.22115V0.778846C7 0.254207 6.73245 0 6.21374 0H4.93606C4.41189 0 4.1498 0.265024 4.1498 0.778846V8.22115C4.1498 8.73498 4.41189 9 4.93606 9Z"
                fill="currentColor"
            />
        </Icon>
    )
}
