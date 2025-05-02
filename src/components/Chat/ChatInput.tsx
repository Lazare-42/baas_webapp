import { Button, Flex, Input, InputProps } from '@chakra-ui/react'
import React from 'react'

interface ChatInputProps extends Omit<InputProps, 'onSubmit'> {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: () => void
    isLoading: boolean
}

export const ChatInput: React.FC<ChatInputProps> = ({
    value,
    onChange,
    onSubmit,
    isLoading,
    ...inputProps
}) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            if (value.trim() && !isLoading) {
                onSubmit()
            }
        }
    }

    return (
        <Flex p={4} align="center">
            <Input
                flex="1"
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask something about your meetings..."
                size="md"
                bg="white"
                disabled={isLoading}
                fontFamily="baasBody"
                fontSize="md"
                {...inputProps}
            />
            <Button
                ml={2}
                colorScheme="teal"
                onClick={onSubmit}
                isLoading={isLoading}
                loadingText="Sending"
                disabled={!value.trim() || isLoading}
            >
                Send
            </Button>
        </Flex>
    )
} 