import { ButtonProps } from '@chakra-ui/react'
import { useState } from 'react'
import { CheckedIcon, CopyIcon } from '~/assets/icons'
import { BaasButtonStackSquare } from './BaasButtonStackSquare'

export const CopyButton: React.FC<ButtonProps & { contentTocopy?: string }> = ({
    contentTocopy,
    ...buttonProps
}) => {
    const [copySuccess, setCopySuccess] = useState(false)

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code).then(
            () => {
                setCopySuccess(true)
                setTimeout(() => setCopySuccess(false), 1100)
            },
            () => alert('Failed to copy'), // Display an alert if the copy fails
        )
    }

    return (
        <BaasButtonStackSquare
            aria-label="Toggle API key visibility"
            {...buttonProps}
            onClick={() => {
                copyToClipboard(contentTocopy ? contentTocopy : '')
            }}
            icon={copySuccess ? <CheckedIcon /> : <CopyIcon />}
            squareButton={true}
        />
    )
}
