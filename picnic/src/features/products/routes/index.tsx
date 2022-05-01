import { Route, Routes } from 'react-router-dom'
import { ProductsListPage } from '../components/ProductsListPage'

export const ProductsRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<ProductsListPage />} />
        </Routes>
    )
}
