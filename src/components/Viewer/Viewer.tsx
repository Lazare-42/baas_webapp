import { Button, Container, Flex, Text } from '@chakra-ui/react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { ArrowBackIcon } from '@chakra-ui/icons'
import { MediaPlayerInstance } from '@vidstack/react'
import { useParams } from 'react-router-dom'
import { DownloadIcon } from '~/assets/icons'
import { useMeetingData } from '~/hooks/useMeetingData'
import { useRequest } from '~/hooks/useRequest'
import TranscriptComponent from './Transcript'
import { VideoPlayer } from './VideoPlayer'

export const Viewer = () => {
    const [botId, setBotId] = useState<string | null>(null)
    const [currentTime, setCurrentTime] = useState(0)
    const [videoPlayer, setVideoPlayer] = useState<MediaPlayerInstance | null>(
        null,
    )
    const { data: dataApiKey } = useRequest<{ api_key: string }>({
        url: '/accounts/api_key',
    })
    const transcriptRef = useRef<HTMLDivElement>(null)
    const { botId: botIdParam } = useParams<{ botId: string }>()

    useEffect(() => {
        if (botIdParam) {
            setBotId(botIdParam)
        }
    }, [botIdParam])

    const { meetingData, loading, error } = useMeetingData(
        botId,
        dataApiKey?.api_key || null,
    )

    const handleTimeUpdate = useCallback(
        (time: number) => {
            setCurrentTime(time)

            if (transcriptRef.current && meetingData) {
                const currentWord = meetingData.bot_data.transcripts
                    .flatMap(
                        (entry: {
                            words: { start_time: number; end_time: number }[]
                        }) => entry.words,
                    )
                    .find(
                        (word: { start_time: number; end_time: number }) =>
                            time >= word.start_time && time <= word.end_time,
                    )

                if (currentWord) {
                    const wordElement = transcriptRef.current.querySelector(
                        `[data-time="${currentWord.start_time}"]`,
                    )
                    if (wordElement) {
                        wordElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                        })
                    }
                }
            }
        },
        [meetingData],
    )

    const handleSeek = useCallback(
        (time: number) => {
            if (videoPlayer) {
                videoPlayer.currentTime = time
            }
        },
        [videoPlayer],
    )

    const setPlayerRef = useCallback((player: MediaPlayerInstance) => {
        setVideoPlayer(player)
    }, [])

    const handleDownloadJSON = useCallback(() => {
        if (meetingData) {
            const dataStr = JSON.stringify(meetingData, null, 2)
            const dataBlob = new Blob([dataStr], { type: 'application/json' })
            const url = URL.createObjectURL(dataBlob)
            const link = document.createElement('a')
            link.href = url
            link.download = 'meeting_data.json'
            link.click()
            URL.revokeObjectURL(url)
        }
    }, [meetingData])

    const handleDownloadVideo = useCallback(() => {
        if (meetingData && meetingData.mp4) {
            fetch(meetingData.mp4)
                .then((response) => response.blob())
                .then((blob) => {
                    const url = URL.createObjectURL(blob)
                    const link = document.createElement('a')
                    link.href = url
                    link.download = 'meeting_video.mp4'
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                    URL.revokeObjectURL(url)
                })
                .catch((error) =>
                    console.error(
                        'Erreur lors du téléchargement de la vidéo:',
                        error,
                    ),
                )
        }
    }, [meetingData])

    if (!botId || !dataApiKey?.api_key) {
        return <Text color={'neutral.50'}>Loading URL parameters...</Text>
    }

    /**
     * Navigate back to the logs page. If the page is opened in a new tab,
     * close the current tab and navigate to the logs page.
     * If the page is opened directly, navigate to the logs page.
     */
    const handleBackClick = () => {
        const logsUrl = 'https://logs.meetingbaas.com/'
        if (window.opener && !window.opener.closed) {
            window.close()
            setTimeout(() => {
                // Just in case close() is blocked by the browser
                window.location.href = logsUrl
            }, 500)
        } else {
            window.location.href = logsUrl
        }
    }

    return (
        <Flex h="100vh" w="100vw" flexDir={'row'} bg="neutral.700">
            <Container
                flexDir={'column'}
                h="full"
                maxH="full"
                w={'full'}
                gap="2"
                p={{ base: 2, lg: 4 }}
                maxW="6xl"
                overflow={'clip'}
                centerContent
                rounded={'lg'}
                // bg="neutral.900"
            >
                {loading ? (
                    <Text color={'neutral.50'}>Loading meeting data...</Text>
                ) : error ? (
                    <Text color={'error.500'}>Error: {error.message}</Text>
                ) : !meetingData ? (
                    <Text color={'warning.500'}>No meeting data available</Text>
                ) : (
                    <>
                        <Flex w="full" justify={'space-between'}>
                            <Flex p="1">
                                <Button
                                    variant={'chartType'}
                                    isActive={true}
                                    color="neutral.900"
                                    onClick={handleBackClick}
                                >
                                    <ArrowBackIcon />
                                </Button>
                            </Flex>

                            <Flex
                                align="center"
                                gap="2"
                                rounded="lg"
                                w="fit-content"
                                h="fit-content"
                                p="1"
                                bg="neutral.900"
                            >
                                <Button
                                    isActive={true}
                                    onClick={handleDownloadJSON}
                                    variant={'chartType'}
                                >
                                    Download JSON
                                </Button>
                                <Button
                                    isActive={true}
                                    variant={'chartType'}
                                    onClick={handleDownloadVideo}
                                >
                                    Download Video
                                    <DownloadIcon />
                                </Button>
                            </Flex>
                        </Flex>
                        <Flex
                            w="full"
                            flexDir={'column'}
                            bg="neutral.900"
                            flexGrow={1}
                            overflowY="hidden"
                            p="2"
                            rounded={'lg'}
                            gap="4"
                        >
                            <Flex width={'full'} mx="auto" maxW="2xl">
                                <VideoPlayer
                                    setPlayer={setPlayerRef}
                                    src={meetingData.mp4}
                                    onTimeUpdate={handleTimeUpdate}
                                    assetTitle={
                                        meetingData.name || 'Meeting Video'
                                    }
                                />
                            </Flex>

                            <Flex
                                ref={transcriptRef}
                                flexGrow={1}
                                overflowY="auto"
                            >
                                <TranscriptComponent
                                    transcript={
                                        meetingData.bot_data.transcripts
                                    }
                                    currentTime={currentTime}
                                    onWordClick={handleSeek}
                                />
                            </Flex>
                        </Flex>
                    </>
                )}
            </Container>
        </Flex>
    )
}
