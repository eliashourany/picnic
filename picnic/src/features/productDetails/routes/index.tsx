import { Route, Routes } from 'react-router-dom'
import { ProductDetailsPage } from '../components/ProductDetailsPage'

export const ProductDetailsRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<ProductDetailsPage />} />
        </Routes>
    )
}
