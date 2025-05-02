import { ComponentStyleConfig } from '@chakra-ui/react'

export const Menu: ComponentStyleConfig = {
    parts: ['menu', 'list', 'button', 'item', 'groupTitle', 'text'],
    baseStyle: {
        groupTitle: {
            bg: 'neutral.900',
            color: 'white',
            textColor: 'white',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: 'calc(100vw - 50px)',
        },
        list: {
            bg: 'neutral.700',
            border: 'none',
            boxShadow: 'lg',
            py: 2,
            zIndex: 999,
            position: 'relative',
            color: 'neutral.50',
            gap: 1,
            rounded: 'lg',
            display: 'flex',
            flexDir: 'column',
            fontSize: { base: 'sm', lg: 'md' },
            p: 1,
            borderColor: 'neutral.500',
        },
        item: {
            bg: 'transparent',
            color: 'white',
            _hover: { bg: 'primary.700' },
            gap: '2',
            rounded: 'md',
        },
    },
    sizes: {},
    variants: {
        white: {
            button: {
                color: 'gray.800',
                px: 4,
                py: 2,
                borderBottomLeftRadius: '0',
                borderRadius: '8px',
                mx: '8px',
                mb: '8px',
                border: '1px',
                borderColor: 'neutral.700',
                height: '34px',
            },
            menu: {
                boxShadow: 'lg',
                rounded: 'lg',
                flexDirection: 'column',
                py: '2',
            },
            item: {
                bg: 'transparent',
                ml: '8px',
            },
            list: {
                zIndex: '4',
                maxHeight: '40vh',
                overflowY: 'scroll',
                overflowX: 'hidden',
            },
            groupTitle: {
                color: 'white',
                textColor: 'white',
            },
            text: {
                fontWeight: '400',
                fontSize: '12px',
                lineHeight: '12px',
            },
        },
        dark: {
            button: {
                color: 'gray.800',
                px: 4,
                py: 2,
                borderBottomLeftRadius: '0',
                bg: 'neutral.900',
                borderRadius: '8px',
                mx: '8px',
                mb: '8px',
                border: '1px',
                borderColor: 'neutral.700',
                height: '34px',
            },
            menu: {
                boxShadow: 'lg',
                rounded: 'lg',
                flexDirection: 'column',
                py: '2',
            },
            item: {
                bg: 'transparent',
                width: 'calc(100vw - 20px)',
                ml: '8px',
                _hover: {
                    bg: 'neutral.700',
                },
                _focus: {
                    bg: 'neutral.900',
                },
            },
            list: {
                bg: 'neutral.900',
                zIndex: '4',
                width: 'calc(100vw - 20px)',
                maxHeight: '40vh',
                overflowY: 'scroll',
                overflowX: 'hidden',
            },
            groupTitle: {
                bg: 'neutral.900',
                color: 'white',
                textColor: 'white',
            },
            text: {
                fontWeight: '400',
                fontSize: '12px',
                lineHeight: '12px',
            },
        },
        speedMenu: {
            button: {
                h: '36px',
                w: '36px',
            },
            menu: {
                bg: '#0f172a66',
            },
            item: {
                // justifyContent: 'center',
                bg: 'transparent',
                borderRadius: '8px',
                _hover: {
                    bg: 'neutral.800',
                },
                _focus: {
                    bg: 'neutral.900',
                },
            },
            list: {
                bg: '#0f172a66',
                minWidth: '72px',
            },
            text: {},
        },
    },
    defaultProps: {
        size: 'md',
    },
}
