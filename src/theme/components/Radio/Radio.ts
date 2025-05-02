import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { radioAnatomy } from '@chakra-ui/anatomy'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(radioAnatomy.keys)

const baseStyle = definePartsStyle({
    control: {},
    label: {
        pl: '8px',
    },
})

export const radioTheme = defineMultiStyleConfig({ baseStyle })
