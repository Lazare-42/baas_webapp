import * as React from 'react'
import { Text, TextProps, Tooltip } from '@chakra-ui/react'

export const TextTooltipElipsis = ({ children, ...props }: TextProps) => {
    const textRef = React.useRef<HTMLParagraphElement>()
    const [isEllipsisActive, setIsEllipsisActive] = React.useState(false)

    React.useEffect(() => {
        const element = textRef.current

        setIsEllipsisActive(
            element
                ? element.offsetWidth < element.scrollWidth ||
                      element.offsetHeight < element.scrollHeight
                : false,
        )
    })

    return (
        <>
            <Tooltip
                placement="bottom"
                label={children}
                width="calc(100vw - 16px)"
                isDisabled={!isEllipsisActive}
            >
                <Text ref={textRef as any} {...props}>
                    {children}
                </Text>
            </Tooltip>
        </>
    )
}
