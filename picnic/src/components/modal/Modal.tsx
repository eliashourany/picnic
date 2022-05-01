import { createPortal } from 'react-dom'
import {
    ButtonHTMLAttributes,
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useRef,
} from 'react'
import { ReactComponent as Cross } from '../../assets/cross.svg'
import styles from './Modal.module.css'

const modalContext = createContext({
    onModalClose: () => {},
})

export type ModalProps = {
    onModalClose: () => void
    children: ReactNode
}

export const Modal = ({ children, onModalClose }: ModalProps) => {
    useEffect(() => {
        document.body.style.overflowY = 'hidden'
        return () => {
            document.body.style.overflowY = 'auto'
        }
    }, [])

    useEffect(() => {
        function keyListener(e: KeyboardEvent) {
            const listener = keyListenersMap.get(e.keyCode)
            return listener && listener(e)
        }
        document.addEventListener('keydown', keyListener)

        return () => document.removeEventListener('keydown', keyListener)
    })

    const modalRef = useRef<HTMLDivElement>(null)
    const handleTabKey = (e: KeyboardEvent) => {
        const focusableModalElements = modalRef.current!.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        )
        const firstElement = focusableModalElements[0]
        const lastElement =
            focusableModalElements[focusableModalElements.length - 1]

        if (!e.shiftKey && document.activeElement !== firstElement) {
            ;(firstElement as HTMLElement).focus()
            return e.preventDefault()
        }

        if (e.shiftKey && document.activeElement !== lastElement) {
            ;(lastElement as HTMLElement).focus()
            e.preventDefault()
        }
    }

    const keyListenersMap = new Map([
        [27, onModalClose],
        [9, handleTabKey],
    ])

    return createPortal(
        <div
            className={styles.modal__container}
            role="dialog"
            aria-modal="true"
        >
            <div className={styles.modal__content} ref={modalRef}>
                <modalContext.Provider value={{ onModalClose }}>
                    {children}
                </modalContext.Provider>
            </div>
        </div>,
        document.body
    )
}

Modal.Header = function ModalHeader(props: { children: ReactNode }) {
    const { onModalClose } = useContext(modalContext)

    return (
        <div className={styles.modal__header}>
            {props.children}
            <button
                className={styles.cross}
                title="close modal"
                onClick={onModalClose}
            >
                <Cross />
            </button>
        </div>
    )
}

Modal.Body = function ModalBody(props: { children: ReactNode }) {
    return <div className={styles.modal__body}>{props.children}</div>
}

Modal.Footer = function ModalFooter(props: { children: ReactNode }) {
    return <div className={styles.modal__footer}>{props.children}</div>
}

Modal.CloseBtn = function CloseBtn(
    props: ButtonHTMLAttributes<HTMLButtonElement>
) {
    const { onModalClose } = useContext(modalContext)
    return (
        <>
            <button
                {...props}
                className={styles.close}
                title="close modal"
                onClick={onModalClose}
            />
        </>
    )
}
