import { Box, Button, ButtonProps } from '@chakra-ui/react'
import { Calendar, GetBackForwardPropsOptions } from 'dayzed'
import React, { Fragment, useState } from 'react'
import { DatepickerProps } from '../utils/commonTypes'

interface DatepickerBackBtnsProps extends DatepickerProps {
    calendars: Calendar[]
    getBackProps: (data: GetBackForwardPropsOptions) => Record<string, any>
}

const DefaultBtnStyle: ButtonProps = {
    variant: 'unstyled',
    size: 'sm',
    fontWeight: 'bold',
    rounded: 'lg',
    border: '1px',
    borderColor: 'primary.500',
    bg: 'neutral.700',
    color: 'primary.500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease-in-out',
    _hover: {
        transform: 'translateY(4px)',
        cursor: 'pointer',
    },
}

const NavButton: React.FC<ButtonProps & { children: React.ReactNode }> = ({
    children,
    ...props
}) => {
    const [isClicked, setIsClicked] = useState(false)

    const toggleAnimation = () => {
        setIsClicked(!isClicked)
    }

    return (
        <Box position="relative" bottom="4px" zIndex={10} minW="32px">
            <Button
                onClick={(e) => {
                    toggleAnimation()
                    props.onClick?.(e)
                }}
                {...DefaultBtnStyle}
                _hover={{
                    transform: isClicked
                        ? 'translateY(8px)'
                        : 'translateY(4px)',
                    cursor: 'pointer',
                }}
                {...props}
            >
                {children}
            </Button>
            <Box
                position="absolute"
                top="4px"
                zIndex={-1}
                width="full"
                height="full"
                rounded="lg"
                overflow="hidden"
                bg="primary.700"
                border="1px"
                borderColor="primary.500"
            />
        </Box>
    )
}

export const DatepickerBackBtns: React.FC<DatepickerBackBtnsProps> = (
    props,
) => {
    const { calendars, getBackProps } = props
    const customBtnProps = props.propsConfigs?.dateNavBtnProps

    return (
        <Fragment>
            <NavButton {...getBackProps({ calendars })} {...customBtnProps}>
                {'<'}
            </NavButton>
        </Fragment>
    )
}

interface DatepickerForwardBtnsProps extends DatepickerProps {
    calendars: Calendar[]
    getForwardProps: (data: GetBackForwardPropsOptions) => Record<string, any>
}

export const DatepickerForwardBtns: React.FC<DatepickerForwardBtnsProps> = (
    props,
) => {
    const { calendars, getForwardProps } = props
    const customBtnProps = props.propsConfigs?.dateNavBtnProps

    return (
        <Fragment>
            <NavButton {...getForwardProps({ calendars })} {...customBtnProps}>
                {'>'}
            </NavButton>
        </Fragment>
    )
}
