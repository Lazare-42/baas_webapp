import { Icon, IconProps } from '@chakra-ui/react'

export const TabKeyIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon
            aria-hidden="true"
            role="img"
            preserveAspectRatio="xMidYMid meet"
            {...props}
            viewBox="0 0 24 24"
        >
            <g fill="none">
                <path
                    d="M18.207 11.293l-6.5-6.5a1 1 0 0 0-1.497 1.32l.083.094L15.086 11H4a1 1 0 0 0-.993.883L3 12a1 1 0 0 0 .883.993L4 13h11.086l-4.793 4.793a1 1 0 0 0-.083 1.32l.083.094a1 1 0 0 0 1.32.083l.094-.083l6.5-6.5a1 1 0 0 0 .083-1.32l-.083-.094l-6.5-6.5l6.5 6.5zM21 18.5v-13a1 1 0 1 0-2 0v13a1 1 0 1 0 2 0z"
                    fill="currentColor"
                />
            </g>
        </Icon>
    )
}
