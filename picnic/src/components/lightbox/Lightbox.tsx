import styles from './Lightbox.module.css'
import { createPortal } from 'react-dom'
import { useCallback, useEffect, useMemo, useRef } from 'react'

export type LightboxProps = {
    imageSrc: string
    imageAlt?: string
    isOpen?: boolean
    close?: () => void
}

export function Lightbox({
    imageSrc,
    imageAlt = '',
    isOpen = false,
    close = () => {},
}: LightboxProps) {
    const closeButton = useRef<HTMLButtonElement>(null)

    const handleTabKey = useCallback(
        (e: KeyboardEvent) => {
            if (closeButton.current) {
                closeButton.current.focus()
            }
            e.preventDefault()
        },
        [closeButton.current]
    )

    const keyListenersMap = useMemo(() => {
        return new Map([
            [27, close],
            [9, handleTabKey],
        ])
    }, [])

    const keyListener = useCallback((e: KeyboardEvent) => {
        const listener = keyListenersMap.get(e.keyCode)
        return listener && listener(e)
    }, [])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflowY = 'hidden'
            document.addEventListener('keydown', keyListener)
        } else {
            document.body.style.overflowY = 'auto'
            document.removeEventListener('keydown', keyListener)
        }
    }, [isOpen])

    return isOpen
        ? createPortal(
              <div className={styles.lightbox}>
                  <img
                      src={imageSrc}
                      alt={imageAlt}
                      className={styles.lightbox__image}
                  />
                  <button
                      ref={closeButton}
                      className={styles.lightbox__close}
                      aria-label="close lightbox"
                      onClick={close}
                  ></button>
              </div>,
              document.body
          )
        : null
}
