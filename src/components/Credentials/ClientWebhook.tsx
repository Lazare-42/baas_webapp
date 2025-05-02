import { EditIcon, LinkIcon } from '@chakra-ui/icons'
import { Center, Flex, Link, Spinner, Text } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { CheckedIcon, CrossIcon } from '~/assets/icons'
import { useCredentials } from '~/contexts/credentials/CredentialsContext'
import { isValidUrl } from '~/utils/isValidUrl'
import { BaasButtonStackSquare } from '../Atoms/Buttons/BaasButtonStackSquare'
import { CopyButton } from '../Atoms/Buttons/CopyButton'
import { BaasInput } from '../Atoms/Input/BaasInput'

export const ClientWebhook = () => {
    const { webhookUrl, setWebhookUrl } = useCredentials()
    const [tempWebhookUrl, setTempWebhookUrl] = useState(webhookUrl)
    const [editMode, setEditMode] = useState(!webhookUrl)

    const isWebhookUrlValid = useMemo(
        () => (tempWebhookUrl === '' ? false : isValidUrl(tempWebhookUrl)),
        [tempWebhookUrl],
    )

    const saveWebhook = () => {
        setWebhookUrl(tempWebhookUrl)
        setEditMode(false)
    }

    return webhookUrl === undefined ? (
        <Spinner />
    ) : (
        <Flex flexDir="column" w="full">
            <BaasInput
                editable={editMode}
                headerContent={
                    <Flex direction="column" gap="2" pb="2">
                        Your webhook path:
                        <Text fontSize="md" mb={2} px="2">
                            A webhook is an automated method for receiving
                            real-time notifications. It allows you to receive
                            data as soon as an event occurs, rather than
                            constantly checking for new information.
                        </Text>
                        <Text fontSize="md" px="2">
                            To test your webhook, you can use a tool like{' '}
                            <Link
                                href="https://webhook-test.com/"
                                isExternal
                                color="primary.500"
                            >
                                webhook-test.com <LinkIcon mx="2px" />
                            </Link>
                            . This tool will allow you to create a test webhook
                            and verify its proper functioning.
                        </Text>
                    </Flex>
                }
                placeholder="https://your-webhook-url.com"
                onChange={(e) => setTempWebhookUrl(e.target.value)}
                value={editMode ? tempWebhookUrl : webhookUrl}
                errorMessage={
                    isWebhookUrlValid
                        ? ''
                        : 'It looks like your webhook URL is invalid'
                }
                rightButton={
                    editMode ? (
                        <Center gap="2">
                            <BaasButtonStackSquare
                                onClick={() => {
                                    setTempWebhookUrl(webhookUrl)
                                    setEditMode(false)
                                }}
                                squareButton
                                aria-label="Cancel edit"
                                icon={<CrossIcon />}
                            />
                            <BaasButtonStackSquare
                                onClick={saveWebhook}
                                squareButton
                                aria-label="Save webhook"
                                icon={<CheckedIcon />}
                            />
                        </Center>
                    ) : (
                        <Center gap="2">
                            <CopyButton contentTocopy={webhookUrl ?? ''} />
                            <BaasButtonStackSquare
                                onClick={() => setEditMode(true)}
                                squareButton
                                aria-label="Edit webhook"
                                icon={<EditIcon />}
                            />
                        </Center>
                    )
                }
            />
        </Flex>
    )
}
