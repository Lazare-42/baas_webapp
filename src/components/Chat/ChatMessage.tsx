import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

export interface ChatMessageProps {
    id: string
    role: 'user' | 'assistant'
    content: string
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ id, role, content }) => {
    return (
        <Box
            key={id}
            mb={4}
            display="flex"
            alignItems="flex-start"
            flexDirection={role === 'user' ? 'row-reverse' : 'row'}
        >
            <Avatar
                size="sm"
                name={role === 'user' ? 'You' : 'Assistant'}
                bg={role === 'user' ? 'blue.500' : 'teal.500'}
                mr={role === 'user' ? 0 : 2}
                ml={role === 'user' ? 2 : 0}
            />
            <Box
                maxW="80%"
                bg={role === 'user' ? 'blue.100' : 'white'}
                p={3}
                borderRadius="lg"
                boxShadow="sm"
            >
                <Text whiteSpace="pre-wrap">{content}</Text>
            </Box>
        </Box>
    )
} 