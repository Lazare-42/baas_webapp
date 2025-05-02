interface SearchResult {
    id: string
    name?: string
    match?: string
}

interface BotResult extends SearchResult {
    name: string
}

interface ContentResult extends SearchResult {
    match: string
}

export interface SearchState {
    value: string
    debouncedValue: string
    results: {
        bots: BotResult[]
        content: ContentResult[]
    }
}

export interface SearchResults {
    botResults: BotResult[]
    contentResults: ContentResult[]
}
