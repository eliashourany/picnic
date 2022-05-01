import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import {
    getProductDetailsAsync,
    reset,
    selectProductDetailsStatus,
} from '../slices/ProductDetailsSlice'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ProductDetails } from './ProductDetails'

export function ProductDetailsPage() {
    const dispatch = useAppDispatch()
    const status = useAppSelector(selectProductDetailsStatus)
    const { productId } = useParams()

    useEffect(() => {
        if (!productId) {
            throw new Error('Invalid product ID')
        }
        dispatch(getProductDetailsAsync(productId))
        return () => {
            dispatch(reset())
        }
    }, [])

    return <ProductDetails status={status} />
}
