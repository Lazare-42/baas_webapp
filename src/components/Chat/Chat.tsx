import { SettingsIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, IconButton, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { callMCPTool, listMCPTools } from '../../api/mcpService'
import { useCredentials } from '../../contexts/credentials/CredentialsContext'
import { ChatContainer, Message } from './ChatContainer'
import { ChatInput } from './ChatInput'
import { ChatSettingsModal } from './ChatSettingsModal'

interface ChatProps {
    title?: string
    description?: string
}

export const Chat: React.FC<ChatProps> = ({
    title = 'Meeting Assistant',
    description = 'Ask questions about your meetings, transcripts, or recordings.',
}) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content:
                'Hello! I can help you with your meetings. You can ask me about transcripts, recordings, or to create a meeting bot.',
        },
    ])
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [availableTools, setAvailableTools] = useState<string[]>([])
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { apiKey } = useCredentials()

    // Check connection to MCP server and list available tools on component mount
    useEffect(() => {
        if (apiKey) {
            const checkConnection = async () => {
                try {
                    console.log('Checking connection to MCP server...')
                    const response = await listMCPTools(apiKey)

                    if (response.result && response.result.content) {
                        // Extract tool names from response
                        const tools = response.result.content
                            .map(item => item.text)
                            .filter(Boolean)

                        console.log('Available MCP tools:', tools)
                        setAvailableTools(tools)

                        // Add a message showing available tools for debugging
                        addAssistantMessage(
                            `Connected to MCP server. Available tools: ${tools.join(', ')}`
                        )
                    } else if (response.error) {
                        console.error('Error listing MCP tools:', response.error)
                        addAssistantMessage(
                            `Could not retrieve available tools: ${response.error.message}`
                        )
                    }
                } catch (error) {
                    console.error('Failed to connect to MCP server:', error)
                    addAssistantMessage(
                        'Could not connect to the Meeting Assistant server. Please check your API key and try again.'
                    )
                }
            }

            checkConnection()
        }
    }, [apiKey])

    // Helper function to add an assistant message
    const addAssistantMessage = (content: string) => {
        setMessages((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                role: 'assistant',
                content,
            },
        ])
    }

    // Function to send message to the MCP server
    const sendMessage = async () => {
        if (!inputValue.trim()) return

        // Check if we have an API key
        if (!apiKey) {
            toast({
                title: 'API Key Required',
                description: 'Please set up your API key in the Credentials section.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
            return
        }

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
        }

        // Add user message to the UI
        setMessages((prev) => [...prev, userMessage])
        setInputValue('')
        setIsLoading(true)

        try {
            console.log('Sending message to MCP server:', userMessage.content)

            // Try intelligentSearch if it's available
            const useIntelligentSearch = availableTools.includes('intelligentSearch')

            console.log(`Using ${useIntelligentSearch ? 'intelligentSearch' : 'listMCPTools'} MCP tool`)

            let response
            if (useIntelligentSearch) {
                // First try intelligentSearch as it's the most natural approach
                response = await callMCPTool('intelligentSearch', {
                    query: userMessage.content,
                    includeContext: true,
                    maxResults: 10,
                }, apiKey)
            } else {
                // Fallback to listing tools if intelligentSearch is not available
                response = await listMCPTools(apiKey)
            }

            console.log('MCP server response:', response)

            // Process the response
            if (response.result && response.result.content) {
                const responseContent = response.result.content
                    .map((item) => item.text)
                    .join('\n')

                const assistantMessage: Message = {
                    id: response.id,
                    role: 'assistant',
                    content: responseContent,
                }

                setMessages((prev) => [...prev, assistantMessage])
            } else if (response.error) {
                // Handle error from the MCP server
                console.error('MCP server returned an error:', response.error)
                addAssistantMessage(`Error: ${response.error.message}`)
            } else {
                // Fallback if no proper response or error
                console.warn('MCP server returned an unexpected response:', response)
                addAssistantMessage(
                    "I didn't get a proper response from the server. Please try again or rephrase your question."
                )
            }
        } catch (error) {
            console.error('Error sending message to MCP server:', error)

            toast({
                title: 'Error',
                description: 'Failed to get a response from the server. Please try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })

            // Add error message
            addAssistantMessage(
                'Sorry, I encountered an error while processing your request. Please try again.'
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <VStack spacing={6} align="stretch">
            <Flex justifyContent="space-between" alignItems="center">
                <Box>
                    <Heading as="h1" size="xl" mb={2} fontFamily="baasHeading">
                        {title}
                    </Heading>
                    <Text fontFamily="baasBody">{description}</Text>
                </Box>
                <IconButton
                    aria-label="Help"
                    icon={<SettingsIcon />}
                    onClick={onOpen}
                    variant="outline"
                />
            </Flex>

            <ChatContainer messages={messages} isLoading={isLoading}>
                <ChatInput
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onSubmit={sendMessage}
                    isLoading={isLoading}
                />
            </ChatContainer>

            <ChatSettingsModal
                isOpen={isOpen}
                onClose={onClose}
            />
        </VStack>
    )
} 