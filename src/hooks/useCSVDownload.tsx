import { useCallback, useState } from 'react'

type CSVData = Array<Record<string, string | number>>

export const useCSVDownload = () => {
    const [isDownloading, setIsDownloading] = useState(false)

    const downloadCSV = useCallback((data: CSVData, filename: string) => {
        setIsDownloading(true)

        try {
            const headers = Object.keys(data[0])
            const csvContent = [
                headers.join(','),
                ...data.map((row) =>
                    headers
                        .map((header) => {
                            let cell = row[header]
                            // Wrap the cell in quotes if it contains a comma
                            if (
                                typeof cell === 'string' &&
                                cell.includes(',')
                            ) {
                                cell = `"${cell}"`
                            }
                            return cell
                        })
                        .join(','),
                ),
            ].join('\n')

            const blob = new Blob([csvContent], {
                type: 'text/csv;charset=utf-8;',
            })
            const link = document.createElement('a')
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob)
                link.setAttribute('href', url)
                link.setAttribute('download', `${filename}.csv`)
                link.style.visibility = 'hidden'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }
        } catch (error) {
            console.error('Error downloading CSV:', error)
        } finally {
            setIsDownloading(false)
        }
    }, [])

    return { downloadCSV, isDownloading }
}
