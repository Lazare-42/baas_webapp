export const getPresetRange = (
    preset: string,
): { start: string; end: string } => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    switch (preset) {
        case 'today':
            return {
                start: today.toISOString().split('T')[0],
                end: now.toISOString().split('T')[0],
            }
        case 'yesterday': {
            const yesterday = new Date(today)
            yesterday.setDate(yesterday.getDate())
            return {
                start: yesterday.toISOString().split('T')[0],
                end: yesterday.toISOString().split('T')[0],
            }
        }
        case 'last7days': {
            const last7 = new Date(today)
            last7.setDate(last7.getDate() - 6)
            return {
                start: last7.toISOString().split('T')[0],
                end: now.toISOString().split('T')[0],
            }
        }
        case 'last30days': {
            const last30 = new Date(today)
            last30.setDate(last30.getDate() - 30)
            return {
                start: last30.toISOString().split('T')[0],
                end: now.toISOString().split('T')[0],
            }
        }
        case 'thisMonth': {
            const firstDay = new Date(today.getFullYear(), today.getMonth(), 2)
            const lastDay = new Date(
                today.getFullYear(),
                today.getMonth() + 1,
                0,
            )
            return {
                start: firstDay.toISOString().split('T')[0],
                end: lastDay.toISOString().split('T')[0],
            }
        }
        case 'lastMonth': {
            const today = new Date()
            const firstDay = new Date(
                today.getFullYear(),
                today.getMonth() - 1,
                2,
            )
            const lastDay = new Date(today.getFullYear(), today.getMonth(), 1)
            return {
                start: firstDay.toISOString().split('T')[0],
                end: lastDay.toISOString().split('T')[0],
            }
        }
        default:
            return { start: '', end: '' }
    }
}

export const formatRelativeTime = (dateStr: string): string => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSecs = Math.floor(diffMs / 1000)
    const diffMins = Math.floor(diffSecs / 60)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffSecs < 60) {
        return 'just now'
    } else if (diffMins < 60) {
        return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
    } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    } else if (diffDays < 7) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    } else {
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }
}
