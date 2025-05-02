import { Icon, IconProps } from '@chakra-ui/react'

export const CategoryIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon
            {...props}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 0C0.895431 0 0 0.89543 0 2V5C0 6.10457 0.89543 7 2 7H5C6.10457 7 7 6.10457 7 5V2C7 0.895431 6.10457 0 5 0H2ZM11 0C9.89543 0 9 0.89543 9 2V5C9 6.10457 9.89543 7 11 7H14C15.1046 7 16 6.10457 16 5V2C16 0.895431 15.1046 0 14 0H11ZM0 11C0 9.89543 0.895431 9 2 9H5C6.10457 9 7 9.89543 7 11V14C7 15.1046 6.10457 16 5 16H2C0.89543 16 0 15.1046 0 14V11ZM11 9C9.89543 9 9 9.89543 9 11V14C9 15.1046 9.89543 16 11 16H14C15.1046 16 16 15.1046 16 14V11C16 9.89543 15.1046 9 14 9H11Z"
                fill="currentColor"
            />
        </Icon>
    )
}
