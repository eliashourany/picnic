import {
    DetailedHTMLProps,
    forwardRef,
    InputHTMLAttributes,
    useId,
} from 'react'
import styles from './Input.module.css'
import clsx from 'clsx'

export type InputType = 'text' | 'email' | 'password'

export type InputProps = {
    id?: string
    name?: string
    label?: string
    type?: InputType
    className?: string
    required?: boolean
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            id,
            name = '',
            label = '',
            type = 'text',
            className = '',
            required = false,
            ...props
        },
        ref
    ) => {
        const uniqueId = useId()

        return (
            <div className={styles['input']}>
                <input
                    type={type}
                    className={clsx(styles['input__element'], className)}
                    placeholder="&nbsp;"
                    name={name}
                    id={id || uniqueId}
                    required={required}
                    ref={ref}
                    {...props}
                />
                <label
                    className={styles['input__label']}
                    htmlFor={id || uniqueId}
                >
                    {label}
                    {required && <span aria-hidden="true">*</span>}
                </label>
            </div>
        )
    }
)
