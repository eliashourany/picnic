import clsx from 'clsx'
import styles from './Loader.module.css'

const sizes = {
    sm: styles['loader--sm'],
    md: styles['loader--md'],
    lg: styles['loader--lg'],
    xl: styles['loader--xl'],
}

const variants = {
    light: styles['loader--light'],
    primary: styles['loader--primary'],
}

export type PageLoaderProps = {
    size?: keyof typeof sizes
    variant?: keyof typeof variants
    className?: string
}

export const Loader = ({
    size = 'md',
    variant = 'primary',
    className = '',
}: PageLoaderProps) => {
    return (
        <>
            <svg
                className={clsx(
                    styles['loader'],
                    sizes[size],
                    variants[variant],
                    className
                )}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                data-testid="loading"
            >
                <circle
                    className={styles['loader__inner-circle']}
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className={styles['loader__outer-circle']}
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
            <span className="sr-only">Loading</span>
        </>
    )
}
