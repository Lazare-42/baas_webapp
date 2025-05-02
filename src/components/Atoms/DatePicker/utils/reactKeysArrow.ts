import type { KeyboardEvent } from 'react'

export interface ArrowKeysReactConfig {
    left?: () => void
    right?: () => void
    up?: () => void
    down?: () => void
}

export class ArrowKeysReact {
    config: ArrowKeysReactConfig

    constructor(config: ArrowKeysReactConfig) {
        this.config = config
    }

    getEvents() {
        return {
            onKeyDown: (e: KeyboardEvent) => {
                switch (e.key) {
                    case 'ArrowDown':
                        if (this.config.down) {
                            this.config.down()
                        }
                        break
                    case 'ArrowLeft':
                        if (this.config.left) {
                            this.config.left()
                        }
                        break
                    case 'ArrowRight':
                        if (this.config.right) {
                            this.config.right()
                        }
                        break
                    case 'ArrowUp':
                        if (this.config.up) {
                            this.config.up()
                        }
                        break
                }
            },
        }
    }
}
