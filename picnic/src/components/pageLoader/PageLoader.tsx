import { Loader } from '../loader/Loader'

const containerStyles = {
    position: 'absolute' as 'absolute',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
}

export function PageLoader() {
    return (
        <section style={containerStyles}>
            <Loader />
        </section>
    )
}
