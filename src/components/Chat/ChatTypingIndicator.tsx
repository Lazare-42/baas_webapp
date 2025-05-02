import { Avatar, Flex, Spinner, Text } from '@chakra-ui/react'
import React from 'react'

export const ChatTypingIndicator: React.FC = () => {
    return (
        <Flex justify="flex-start" mb={4}>
            <Avatar size="sm" name="Assistant" bg="teal.500" mr={2} />
            <Flex
                align="center"
                justify="center"
                bg="white"
                p={3}
                borderRadius="lg"
                boxShadow="sm"
                minH="40px"
                minW="60px"
            >
                <Spinner size="sm" color="teal.500" mr={2} />
                <Text fontSize="sm" fontFamily="baasBody">
                    Thinking...
                </Text>
            </Flex>
        </Flex>
    )
} 