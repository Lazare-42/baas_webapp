import { Flex } from '@chakra-ui/react'
import { useLogs } from '~/contexts/logs'
import { RangeDatepicker } from '../Atoms/DatePicker/range'

export const DateFilter = () => {
    const { dateRange, loadedDateRange, handleDateChange } = useLogs()

    // Convertir les chaînes de date en objets Date
    const selectedDates = [
        dateRange.startDate
            ? new Date(`${dateRange.startDate}T00:00:00`)
            : null,
        dateRange.endDate ? new Date(`${dateRange.endDate}T23:59:59`) : null,
    ].filter(Boolean) as Date[]

    // Créer le maxDate à minuit pour une comparaison plus précise
    const maxDate = new Date()
    maxDate.setHours(23, 59, 59, 999)

    const handleCustomDateChange = (dates: Date[]) => {
        // Vérifier si les dates sélectionnées sont valides
        if (dates.some((date) => date > maxDate)) {
            return // Ne pas appeler handleDateChange si une date est dans le futur
        }
        handleDateChange(dates)
    }

    return (
        <Flex gap={0} align="center" rounded="lg" h="40px" position="relative">
            <RangeDatepicker
                selectedDates={selectedDates}
                onDateChange={handleCustomDateChange}
                configs={{
                    dateFormat: 'yyyy-MM-dd',
                    monthsToDisplay: 1,
                }}
                maxDate={maxDate}
                closeOnSelect={true}
            />
        </Flex>
    )
}
