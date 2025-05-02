import { useState } from 'react'
import { EyeDashIcon, EyeIcon } from '~/assets/icons'
import { useCredentials } from '~/contexts/credentials/CredentialsContext'
import { BaasButtonStackSquare } from '../Atoms/Buttons/BaasButtonStackSquare'
import { CopyButton } from '../Atoms/Buttons/CopyButton'
import { BaasInput } from '../Atoms/Input/BaasInput'

export const ApiAccess = () => {
    const { apiKey } = useCredentials()
    const [showApiKey, setShowApiKey] = useState(false)

    return (
        <BaasInput
            editable={false}
            fontColor={
                showApiKey && !apiKey
                    ? 'warning.500'
                    : showApiKey
                      ? 'primary.500'
                      : 'primary.700'
            }
            rightButton={
                <>
                    <CopyButton
                        isActive={showApiKey}
                        contentTocopy={apiKey ?? ''}
                    />
                    <BaasButtonStackSquare
                        onClick={() => setShowApiKey((prev) => !prev)}
                        aria-label="Toggle API Key visibility"
                        icon={showApiKey ? <EyeDashIcon /> : <EyeIcon />}
                        squareButton
                    />
                </>
            }
            headerContent="Your API Key:"
            value={
                showApiKey
                    ? (apiKey ?? '')
                    : 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
            }
        />
    )
}
