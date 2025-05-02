import { TimeIcon } from '@chakra-ui/icons'
import {
    Button,
    Flex,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Popover,
    PopoverAnchor,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Portal,
    useDisclosure,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { Props as DayzedHookProps } from 'dayzed'
import React, { useState } from 'react'
import FocusLock from 'react-focus-lock'

import { getPresetRange } from '~/contexts/logs/utils/date'
import { CalendarIcon } from './components/calendarIcon'
import { CalendarPanel } from './components/calendarPanel'
import { VariantProps } from './single'
import { Month_Names_Short, Weekday_Names_Short } from './utils/calenderUtils'
import {
    CalendarConfigs,
    DatepickerConfigs,
    DatepickerProps,
    OnDateSelected,
    PropsConfigs,
} from './utils/commonTypes'

interface RangeCalendarPanelProps {
    dayzedHookProps: DayzedHookProps
    configs: CalendarConfigs
    propsConfigs?: PropsConfigs
    selected?: Date | Date[]
}

export const RangeCalendarPanel: React.FC<RangeCalendarPanelProps> = ({
    dayzedHookProps,
    configs,
    propsConfigs,
    selected,
}) => {
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null)

    // Calendar level
    const onMouseLeave = () => {
        setHoveredDate(null)
    }

    // Date level
    const onMouseEnterHighlight = (date: Date) => {
        if (!Array.isArray(selected) || !selected?.length) {
            return
        }
        setHoveredDate(date)
    }

    const isInRange = (date: Date) => {
        if (!Array.isArray(selected) || !selected?.length) {
            return false
        }
        const firstSelected = selected[0]
        if (selected.length === 2) {
            const secondSelected = selected[1]
            return firstSelected < date && secondSelected > date
        } else {
            return (
                hoveredDate &&
                ((firstSelected < date && hoveredDate >= date) ||
                    (date < firstSelected && date >= hoveredDate))
            )
        }
    }

    return (
        <Flex onMouseLeave={onMouseLeave}>
            <CalendarPanel
                dayzedHookProps={dayzedHookProps}
                configs={configs}
                propsConfigs={propsConfigs}
                isInRange={isInRange}
                onMouseEnterHighlight={onMouseEnterHighlight}
            />
        </Flex>
    )
}

interface RangeProps extends DatepickerProps {
    selectedDates: Date[]
    configs?: DatepickerConfigs
    disabled?: boolean
    children?: (value: Date[]) => React.ReactNode
    defaultIsOpen?: boolean
    closeOnSelect?: boolean
    onDateChange: (date: Date[]) => void
    id?: string
    name?: string
    usePortal?: boolean
    portalRef?: React.MutableRefObject<null>
}

type RangeDatepickerProps = RangeProps & VariantProps

const DefaultConfigs: Required<DatepickerConfigs> = {
    dateFormat: 'MM/dd/yyyy',
    monthNames: Month_Names_Short,
    dayNames: Weekday_Names_Short,
    firstDayOfWeek: 0,
    monthsToDisplay: 2,
}

const defaultProps = {
    defaultIsOpen: false,
    closeOnSelect: true,
    triggerVariant: 'default' as const,
}

export const RangeDatepicker: React.FC<RangeDatepickerProps> = (props) => {
    const mergedProps = { ...defaultProps, ...props }

    const handlePresetSelect = (preset: string) => {
        const { start, end } = getPresetRange(preset)
        onDateChange([new Date(start), new Date(end)])
        if (closeOnSelect) onClose()
    }
    const {
        configs,
        propsConfigs,
        id,
        name,
        usePortal,
        portalRef,
        defaultIsOpen,
        closeOnSelect,
        selectedDates,
        minDate,
        maxDate,
        onDateChange,
        disabled,
        children,
        triggerVariant,
    } = mergedProps

    // chakra popover utils
    const [dateInView, setDateInView] = useState(selectedDates[0] || new Date())
    const [offset, setOffset] = useState(0)
    const { onOpen, onClose, isOpen } = useDisclosure({ defaultIsOpen })

    const Icon =
        mergedProps.triggerVariant === 'input' && mergedProps.triggerIcon ? (
            mergedProps.triggerIcon
        ) : (
            <CalendarIcon />
        )

    const datepickerConfigs = {
        ...DefaultConfigs,
        ...configs,
    }

    const onPopoverClose = () => {
        onClose()
        setDateInView(selectedDates[0] || new Date())
        setOffset(0)
    }

    const handleOnDateSelected: OnDateSelected = ({ selectable, date }) => {
        if (!selectable) {
            return
        }
        const newDates = [...selectedDates]
        if (selectedDates.length) {
            if (selectedDates.length === 1) {
                const firstTime = selectedDates[0]
                if (firstTime < date) {
                    newDates.push(date)
                } else {
                    newDates.unshift(date)
                }
                onDateChange(newDates)

                if (closeOnSelect) onClose()
                return
            }

            if (newDates.length === 2) {
                onDateChange([date])
                return
            }
        } else {
            newDates.push(date)
            onDateChange(newDates)
        }
    }

    // eventually we want to allow user to freely type their own input and parse the input
    let intVal = selectedDates[0]
        ? `${format(selectedDates[0], datepickerConfigs.dateFormat)}`
        : `${datepickerConfigs.dateFormat}`
    intVal += selectedDates[1]
        ? ` - ${format(selectedDates[1], datepickerConfigs.dateFormat)}`
        : ` - ${datepickerConfigs.dateFormat}`

    const PopoverContentWrapper = usePortal ? Portal : React.Fragment

    return (
        <Popover
            id={id}
            placement="bottom-start"
            variant="responsive"
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onPopoverClose}
            isLazy
        >
            <Flex>
                <PopoverTrigger>
                    <Button
                        type="button"
                        variant={'unstyled'}
                        lineHeight={1}
                        px={4}
                        fontSize={'sm'}
                        disabled={disabled}
                        bg="neutral.500"
                        color="primary.500"
                        fontFamily="baasBody"
                        rounded="lg"
                        roundedRight="none"
                        h="40px"
                        w="210px"
                        _hover={{
                            bg: 'primary.700',
                        }}
                        {...propsConfigs?.triggerBtnProps}
                    >
                        {intVal}
                    </Button>
                </PopoverTrigger>

                <Menu>
                    <MenuButton
                        as={Button}
                        variant="unstyled"
                        bg="neutral.500"
                        color="primary.500"
                        fontFamily="baasBody"
                        fontSize="sm"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        w="40px"
                        borderLeft="1px solid"
                        borderLeftColor="neutral.700"
                        rounded="lg"
                        roundedLeft="none"
                        h="40px"
                        _hover={{ bg: 'primary.700' }}
                    >
                        <TimeIcon boxSize={3} />
                    </MenuButton>
                    <Portal>
                        <MenuList border="1px solid" borderColor="neutral.500">
                            <MenuItem
                                onClick={() => handlePresetSelect('today')}
                            >
                                Today
                            </MenuItem>
                            <MenuItem
                                onClick={() => handlePresetSelect('yesterday')}
                            >
                                Yesterday
                            </MenuItem>
                            <MenuItem
                                onClick={() => handlePresetSelect('last7days')}
                            >
                                Last 7 days
                            </MenuItem>
                            <MenuItem
                                onClick={() => handlePresetSelect('last30days')}
                            >
                                Last 30 days
                            </MenuItem>
                            <MenuItem
                                onClick={() => handlePresetSelect('thisMonth')}
                            >
                                This month
                            </MenuItem>
                            <MenuItem
                                onClick={() => handlePresetSelect('lastMonth')}
                            >
                                Last month
                            </MenuItem>
                        </MenuList>
                    </Portal>
                </Menu>
            </Flex>
            {!children && triggerVariant === 'input' ? (
                <Flex position="relative" alignItems={'center'}>
                    <PopoverAnchor>
                        <Input
                            id={id}
                            onKeyPress={(e) => {
                                if (e.key === ' ' && !isOpen) {
                                    e.preventDefault()
                                    onOpen()
                                }
                            }}
                            autoComplete="off"
                            width={'16rem'}
                            px={4}
                            isDisabled={disabled}
                            name={name}
                            value={intVal}
                            onChange={(e) => e.target.value}
                            fontFamily="baasBody"
                            rounded="lg"
                            h="40px"
                            _hover={{ bg: 'primary.700' }}
                            _focus={{
                                outline: 'none',
                                boxShadow: 'none',
                            }}
                            _placeholder={{ color: 'primary.500' }}
                            {...propsConfigs?.inputProps}
                        />
                    </PopoverAnchor>
                    <PopoverTrigger>
                        <Button
                            position="absolute"
                            variant={'unstyled'}
                            right="0"
                            size="sm"
                            marginRight="5px"
                            zIndex={1}
                            type="button"
                            disabled={disabled}
                            padding={'8px'}
                            color="primary.500"
                            bg="transparent"
                            _hover={{
                                bg: 'transparent',
                            }}
                            {...propsConfigs?.triggerIconBtnProps}
                        >
                            {Icon}
                        </Button>
                    </PopoverTrigger>
                </Flex>
            ) : null}
            {children ? children(selectedDates) : null}
            <PopoverContentWrapper
                {...(usePortal ? { containerRef: portalRef } : {})}
            >
                <PopoverContent
                    width="100%"
                    bg="transparent"
                    boxShadow="none"
                    p={0}
                    border="0px"
                    borderColor="transparent"
                    {...propsConfigs?.popoverCompProps?.popoverContentProps}
                >
                    <PopoverBody
                        p={0}
                        {...propsConfigs?.popoverCompProps?.popoverBodyProps}
                    >
                        <FocusLock>
                            <RangeCalendarPanel
                                dayzedHookProps={{
                                    onDateSelected: handleOnDateSelected,
                                    selected: selectedDates,
                                    monthsToDisplay:
                                        datepickerConfigs.monthsToDisplay,
                                    date: dateInView,
                                    minDate: minDate,
                                    maxDate: maxDate,
                                    offset: offset,
                                    onOffsetChanged: setOffset,
                                    firstDayOfWeek:
                                        datepickerConfigs.firstDayOfWeek,
                                }}
                                configs={datepickerConfigs}
                                propsConfigs={propsConfigs}
                                selected={selectedDates}
                            />
                        </FocusLock>
                    </PopoverBody>
                </PopoverContent>
            </PopoverContentWrapper>
        </Popover>
    )
}
