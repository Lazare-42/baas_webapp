import { Box, Divider } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage'
import { ChatTypingIndicator } from './ChatTypingIndicator'

export interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
}

interface ChatContainerProps {
    messages: Message[]
    isLoading: boolean
    children: React.ReactNode
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
    messages,
    isLoading,
    children
}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, isLoading])

    return (
        <Box
            bg="white"
            borderRadius="md"
            shadow="md"
            height="600px"
            display="flex"
            flexDirection="column"
        >
            {/* Messages display area */}
            <Box
                flex="1"
                overflowY="auto"
                p={4}
                bg="gray.50"
                borderTopRadius="md"
            >
                {messages.map((message) => (
                    <ChatMessage
                        key={message.id}
                        id={message.id}
                        role={message.role}
                        content={message.content}
                    />
                ))}

                {/* Loading indicator */}
                {isLoading && <ChatTypingIndicator />}

                {/* Auto-scroll anchor */}
                <div ref={messagesEndRef} />
            </Box>

            <Divider />

            {/* Input area - passed as children */}
            {children}
        </Box>
    )
} 