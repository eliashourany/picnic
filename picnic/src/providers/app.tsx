import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import { Provider } from 'react-redux'
import { store } from '../stores/store'
import { PageLoader } from '../components/pageLoader/PageLoader'

const ErrorFallback = () => {
    return (
        <div role="alert">
            <h2>Ooops, something went wrong :( </h2>
            <button
                onClick={() => window.location.assign(window.location.origin)}
            >
                Refresh
            </button>
        </div>
    )
}

type AppProviderProps = {
    children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <React.Suspense fallback={<PageLoader />}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Provider store={store}>
                    <Router>{children}</Router>
                </Provider>
            </ErrorBoundary>
        </React.Suspense>
    )
}
