import { Icon, IconProps } from '@chakra-ui/react'

export const BulletPointIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon {...props} viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="4" />
        </Icon>
    )
}
