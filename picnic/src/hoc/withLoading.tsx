import React, { ComponentType } from 'react'
import { STATUS } from '../utils/status'
import { Loader } from '../components/loader/Loader'
import { PageLoader } from '../components/pageLoader/PageLoader'

interface WithLoadingProps {
    status: STATUS
}

function WithLoading<P>(
    Component: ComponentType<P>
): React.FC<P & WithLoadingProps> {
    return function WihLoadingComponent({
        status,
        ...props
    }: P & WithLoadingProps) {
        if (status === STATUS.LOADING) return <PageLoader />
        if (status === STATUS.FAILED)
            throw Error(Component.displayName + ' failed to load!')
        return <Component {...(props as unknown as P)} />
    }
}

export default WithLoading
