import {
    Box,
    Divider,
    Heading,
    HStack,
    SimpleGrid,
    Stack,
    VStack,
} from '@chakra-ui/react'
import { Calendar, DateObj, Props as DayzedHookProps, useDayzed } from 'dayzed'
import React, { useCallback, useMemo } from 'react'
import { CalendarConfigs, DatepickerProps } from '../utils/commonTypes'
import { ArrowKeysReact } from '../utils/reactKeysArrow'
import { DatepickerBackBtns, DatepickerForwardBtns } from './dateNavBtns'
import { DayOfMonth } from './dayOfMonth'

export interface CalendarPanelProps extends DatepickerProps {
    dayzedHookProps: Omit<DayzedHookProps, 'children' | 'render'>
    configs: CalendarConfigs
    disabledDates?: Set<number>
    onMouseEnterHighlight?: (_date: Date) => void
    isInRange?: (date: Date) => boolean | null
}

export const CalendarPanel: React.FC<CalendarPanelProps> = ({
    dayzedHookProps,
    configs,
    propsConfigs,
    disabledDates,
    onMouseEnterHighlight,
    isInRange,
}) => {
    const renderProps = useDayzed(dayzedHookProps)
    const { calendars, getBackProps, getForwardProps } = renderProps

    const checkIsInRange = (date: Date): boolean => {
        if (!isInRange) return false
        const result = isInRange(date)
        return result === null ? false : !!result
    }

    const weekdayNames = useMemo(() => {
        const firstDayOfWeek = configs.firstDayOfWeek
        const dayNames = configs.dayNames
        if (firstDayOfWeek && firstDayOfWeek > 0) {
            return configs.dayNames
                .slice(firstDayOfWeek, dayNames.length)
                .concat(dayNames.slice(0, firstDayOfWeek))
        }
        return dayNames
    }, [configs.firstDayOfWeek, configs.dayNames])

    // looking for a useRef() approach to replace it
    const getKeyOffset = useCallback((num: number) => {
        const e = document.activeElement
        const buttons = document.querySelectorAll('button')
        buttons.forEach((el, i) => {
            const newNodeKey = i + num
            if (el === e) {
                if (newNodeKey <= buttons.length - 1 && newNodeKey >= 0) {
                    buttons[newNodeKey].focus()
                } else {
                    buttons[0].focus()
                }
            }
        })
    }, [])

    const arrowKeysReact = new ArrowKeysReact({
        left: () => {
            getKeyOffset(-1)
        },
        right: () => {
            getKeyOffset(1)
        },
        up: () => {
            getKeyOffset(-7)
        },
        down: () => {
            getKeyOffset(7)
        },
    })

    if (calendars.length <= 0) {
        return null
    }

    return (
        <Stack
            direction={['column', 'column', 'row']}
            bg="neutral.700"
            border="1px solid"
            borderColor="neutral.500"
            boxShadow="lg"
            spacing={4}
            p={6}
            rounded="xl"
            {...propsConfigs?.calendarPanelProps?.wrapperProps}
            {...arrowKeysReact.getEvents()}
        >
            {calendars.map((calendar: Calendar, calendarIdx: number) => {
                return (
                    <VStack
                        key={calendarIdx}
                        height="100%"
                        gap={2}
                        rounded="lg"
                        {...propsConfigs?.calendarPanelProps?.contentProps}
                    >
                        <HStack
                            w="full"
                            justifyContent="space-between"
                            {...propsConfigs?.calendarPanelProps?.headerProps}
                        >
                            <DatepickerBackBtns
                                calendars={calendars}
                                getBackProps={getBackProps}
                                propsConfigs={propsConfigs}
                            />
                            <Heading
                                size="sm"
                                fontFamily={'heading'}
                                minWidth={'5rem'}
                                textAlign="center"
                                color="primary.500"
                                {...propsConfigs?.dateHeadingProps}
                            >
                                {configs.monthNames[calendar.month]}{' '}
                                {calendar.year}
                            </Heading>
                            <DatepickerForwardBtns
                                calendars={calendars}
                                getForwardProps={getForwardProps}
                                propsConfigs={propsConfigs}
                            />
                        </HStack>
                        <Divider
                            opacity={0.2}
                            {...propsConfigs?.calendarPanelProps?.dividerProps}
                        />
                        <SimpleGrid
                            columns={7}
                            spacing={2}
                            textAlign="center"
                            {...propsConfigs?.calendarPanelProps?.bodyProps}
                        >
                            {weekdayNames.map((day, dayIdx) => (
                                <Box
                                    fontSize="sm"
                                    // fontWeight="semibold"
                                    key={dayIdx}
                                    color="primary.500"
                                    opacity={0.9}
                                    {...propsConfigs?.weekdayLabelProps}
                                >
                                    {day}
                                </Box>
                            ))}
                            {calendar.weeks.map(
                                (week: (DateObj | '')[], weekIdx: number) => {
                                    return week.map(
                                        (
                                            dateObj: DateObj | '',
                                            index: number,
                                        ) => {
                                            const key = `${calendar.month}-${calendar.year}-${weekIdx}-${index}`
                                            if (dateObj === '')
                                                return <Box key={key} />
                                            return (
                                                <DayOfMonth
                                                    key={key}
                                                    dateObj={dateObj}
                                                    propsConfigs={propsConfigs}
                                                    renderProps={renderProps}
                                                    isInRange={
                                                        isInRange
                                                            ? checkIsInRange(
                                                                  dateObj.date,
                                                              )
                                                            : false
                                                    }
                                                    disabledDates={
                                                        disabledDates
                                                    }
                                                    onMouseEnter={() => {
                                                        if (
                                                            onMouseEnterHighlight
                                                        )
                                                            onMouseEnterHighlight(
                                                                dateObj.date,
                                                            )
                                                    }}
                                                />
                                            )
                                        },
                                    )
                                },
                            )}
                        </SimpleGrid>
                    </VStack>
                )
            })}
        </Stack>
    )
}
