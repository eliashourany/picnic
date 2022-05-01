import { lazyImport } from '../utils/lazyImport'
import { Navigate } from 'react-router-dom'

const { ProductsRoutes } = lazyImport(
    () => import('../features/products'),
    'ProductsRoutes'
)

const { ProductDetailsRoutes } = lazyImport(
    () => import('../features/productDetails'),
    'ProductDetailsRoutes'
)

export const publicRoutes = [
    {
        path: '/list/:productId/*',
        element: <ProductDetailsRoutes />,
    },
    {
        path: '/list/*',
        element: <ProductsRoutes />,
    },
    {
        path: '*',
        element: <Navigate to="/list" />,
    },
]
