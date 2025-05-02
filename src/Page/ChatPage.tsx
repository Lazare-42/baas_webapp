import { Container } from '@chakra-ui/react'
import { Chat } from '../components/Chat/Chat'
import { Layout } from '../Layout/Layout'

export function ChatPage() {
    return (
        <Layout>
            <Container maxW="container.md" pt={10} pb={10}>
                <Chat
                    title="Meeting Assistant"
                    description="Ask questions about your meetings, transcripts, or recordings."
                />
            </Container>
        </Layout>
    )
} 