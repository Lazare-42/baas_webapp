import {
    Button,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react'
import React from 'react'

interface ChatSettingsModalProps {
    isOpen: boolean
    onClose: () => void
}

export const ChatSettingsModal: React.FC<ChatSettingsModalProps> = ({
    isOpen,
    onClose,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Meeting Assistant Help</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack align="stretch" spacing={4}>
                        <Text fontFamily="baasBody">
                            The Meeting Assistant allows you to interact with your meeting data using natural language.
                            You can ask questions about:
                        </Text>
                        <VStack align="stretch" pl={4}>
                            <Text fontFamily="baasBody">• Meeting transcripts and recordings</Text>
                            <Text fontFamily="baasBody">• Finding specific moments in meetings</Text>
                            <Text fontFamily="baasBody">• Searching across all your meetings</Text>
                            <Text fontFamily="baasBody">• Creating meeting bots</Text>
                        </VStack>
                        <Text fontFamily="baasBody">
                            To use the Meeting Assistant, you need an API key. You can find your API key in the{' '}
                            <Link color="primary.500" href="/credentials" onClick={onClose}>
                                Credentials
                            </Link>{' '}
                            section.
                        </Text>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="teal" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
} 