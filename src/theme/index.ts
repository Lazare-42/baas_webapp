import { extendTheme } from '@chakra-ui/react'
import {
    Badge,
    Button,
    Checkbox,
    Heading,
    Icon,
    IconButton,
    Input,
    Link,
    Menu,
    Progress,
    Switch,
    Tabs,
    Text,
    Textarea,
    Toast,
} from './components'
import { breakpoints, colors, fonts, textStyles } from './foundations'

const theme = extendTheme({
    styles: {
        global: {
            '::selection': {
                backgroundColor: 'rgba(68, 118, 113, 0.8)',
                color: 'neutral.50',
            },
        },
    },

    // Foundations
    colors,
    fonts,
    breakpoints,
    textStyles,

    // Components
    components: {
        Toast,
        Button,
        Badge,
        Checkbox,
        Heading,
        Icon,
        IconButton,
        Input,
        Link,
        Menu,
        Progress,
        Switch,
        Tabs,
        Text,
        Textarea,
    },
})

export default theme
