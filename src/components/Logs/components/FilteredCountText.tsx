import { Text } from '@chakra-ui/react'

interface FilteredCountTextProps {
    count?: number
    hasMoreRows?: boolean
}

export const FilteredCountText = ({
    count = 0,
    hasMoreRows = false,
}: FilteredCountTextProps) => (
    <Text
        key={count}
        animation="2s highlight_text"
        fontSize="xs"
        fontFamily="monospace"
        lineHeight="5px"
        color="primary.700"
        sx={{
            '@keyframes highlight_text': {
                '0%': { color: 'primary.500' },
                '100%': { color: 'primary.700' },
            },
        }}
    >
        {count}{' '}
        {count === 1 ? 'match' : hasMoreRows ? 'results loaded' : 'bots'}
    </Text>
)
