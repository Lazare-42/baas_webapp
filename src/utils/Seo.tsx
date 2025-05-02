import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
    title?: string
    description?: string
    keywords?: string[]
    ogTitle?: string
    ogDescription?: string
    ogImage?: string
    ogUrl?: string
    twitterTitle?: string
    twitterDescription?: string
    twitterImage?: string
    favicon?: string
}

export const SEO: React.FC<SEOProps> = ({
    title = 'Meeting Baas | Run meeting bots with transcription. In 2 minutes. Just Baas, no Bullshit.',
    description = 'Deploy Meeting Bots with transcription. At scale using one API call.',
    keywords = [
        'Record',
        'transcribe',
        'annotate',
        'videomeetings',
        'video',
        'video highlights',
        'summarize',
        'Zoom',
        'Microsoft Teams',
        'Google Meets',
        'highlight',
        'recording',
        'highlight notes',
        'call recording',
        'record automatically',
        'calendar integration',
        'automatic recorder',
        'AI meeting bot',
        'Meeting transcription',
        'Video Meeting Bot',
        'Meeting Bot API',
        'Video meeting API',
        'Zoom API',
        'Google Meet API',
        'Microsoft Teams API',
        'Whisper v3',
        'Language detection',
        'Speech timestamps',
        'Calendar sync',
        'LLM integration',
        'Video Meeting Bot As A Service',
    ],
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    twitterTitle,
    twitterDescription,
    twitterImage,
    favicon,
}) => (
    <Helmet>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords.join(', ')} />}
        {ogTitle && <meta property="og:title" content={ogTitle} />}
        {ogDescription && (
            <meta property="og:description" content={ogDescription} />
        )}
        {ogImage && <meta property="og:image" content={ogImage} />}
        {ogUrl && <meta property="og:url" content={ogUrl} />}
        {twitterTitle && <meta name="twitter:title" content={twitterTitle} />}
        {twitterDescription && (
            <meta name="twitter:description" content={twitterDescription} />
        )}
        {twitterImage && <meta name="twitter:image" content={twitterImage} />}
        {favicon && <link rel="icon" href={favicon} />}
    </Helmet>
)
