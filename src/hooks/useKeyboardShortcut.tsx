// hooks/useKeyboardShortcut.ts
import { useEffect, useRef } from 'react'

type KeyboardShortcutOptions = {
    ctrlKey?: boolean
    metaKey?: boolean
    key: string
    preventDefault?: boolean
}

export const useKeyboardShortcut = (
    options: KeyboardShortcutOptions,
    callback: () => void,
): void => {
    const savedCallback = useRef(callback)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isCtrlOrCmd =
                options.ctrlKey || options.metaKey
                    ? e.ctrlKey || e.metaKey
                    : true
            const isCorrectKey =
                e.key.toLowerCase() === options.key.toLowerCase()

            if (isCtrlOrCmd && isCorrectKey) {
                if (options.preventDefault) {
                    e.preventDefault()
                }
                savedCallback.current()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [options])
}
