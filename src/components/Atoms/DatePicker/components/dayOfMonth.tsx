import { Box, Button } from '@chakra-ui/react'
import { DateObj, RenderProps } from 'dayzed'
import React, { useState } from 'react'
import { DatepickerProps } from '../utils/commonTypes'

interface DayOfMonthProps extends DatepickerProps {
    dateObj: DateObj
    renderProps: RenderProps
    isInRange?: boolean
    disabledDates?: Set<number>
    onMouseEnter?: () => void
}

const defaultBtnProps = {
    variant: 'unstyled',
    size: 'sm',
    fontFamily: 'baasHeading',
    fontWeight: 700,
    rounded: 'lg',
    border: '1px',
    borderColor: 'primary.700',
    bg: 'primary.500',
    color: 'neutral.700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease-in-out',
    _hover: {
        transform: 'translateY(4px)',
        cursor: 'pointer',
    },
    _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
        transform: 'none',
    },
}

const isInRangeBtnProps = {
    ...defaultBtnProps,
    bg: 'primary.700',
    color: 'neutral.50',
    borderColor: 'primary.500',
}

const selectedBtnProps = {
    ...defaultBtnProps,
    bg: 'primary.500',
    color: 'neutral.700',
    borderColor: 'primary.700',
}

const todayBtnProps = {
    ...defaultBtnProps,
    borderColor: 'primary.700',
    borderWidth: '2px',
}

const DayButton: React.FC<any> = ({ children, isDisabled, ...props }) => {
    const [isClicked, setIsClicked] = useState(false)

    const toggleAnimation = () => {
        if (!isDisabled) {
            setIsClicked(!isClicked)
        }
    }

    return (
        <Box position="relative" bottom="4px" zIndex={10} minW="32px">
            <Button
                onClick={(e) => {
                    toggleAnimation()
                    props.onClick?.(e)
                }}
                disabled={isDisabled}
                _hover={{
                    transform: isDisabled
                        ? 'none'
                        : isClicked
                          ? 'translateY(8px)'
                          : 'translateY(4px)',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                }}
                {...props}
            >
                {children}
            </Button>
            <Box
                position="absolute"
                top="6px"
                zIndex={-1}
                width="full"
                height="full"
                rounded="lg"
                overflow="hidden"
                border="1px"
                borderColor="primary.500"
                bg="primary.700"
                opacity={isDisabled ? 0.4 : 1}
            />
        </Box>
    )
}

export const DayOfMonth: React.FC<DayOfMonthProps> = ({
    dateObj,
    renderProps,
    propsConfigs,
    isInRange,
    disabledDates,
    onMouseEnter,
}) => {
    const { getDateProps } = renderProps
    const { date, selected, today, selectable } = dateObj

    const dayProps = {
        ...defaultBtnProps,
        ...propsConfigs?.dayOfMonthBtnProps?.defaultBtnProps,
    }

    if (isInRange) {
        dayProps.bg = isInRangeBtnProps.bg
        dayProps.color = isInRangeBtnProps.color
        dayProps.borderColor = isInRangeBtnProps.borderColor
        Object.assign(
            dayProps,
            propsConfigs?.dayOfMonthBtnProps?.isInRangeBtnProps,
        )
    }

    if (selected) {
        dayProps.bg = selectedBtnProps.bg
        dayProps.color = selectedBtnProps.color
        dayProps.borderColor = selectedBtnProps.borderColor
        Object.assign(
            dayProps,
            propsConfigs?.dayOfMonthBtnProps?.selectedBtnProps,
        )
    }

    if (today) {
        dayProps.borderColor = todayBtnProps.borderColor
        dayProps.borderWidth = todayBtnProps.borderWidth
        Object.assign(dayProps, propsConfigs?.dayOfMonthBtnProps?.todayBtnProps)
    }

    const isDisabled = !selectable || disabledDates?.has(date.getTime())

    return (
        <DayButton
            {...getDateProps({
                dateObj,
                disabled: isDisabled,
            })}
            onMouseEnter={onMouseEnter}
            isDisabled={isDisabled}
            {...dayProps}
        >
            {date.getDate()}
        </DayButton>
    )
}
