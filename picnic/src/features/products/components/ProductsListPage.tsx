import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import {
    getProductsAsync,
    reset,
    selectProductsStatus,
} from '../slices/ProductsSlice'
import { useEffect } from 'react'
import { ProductsList } from './ProductsList'

export const ProductsListPage = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(selectProductsStatus)

    useEffect(() => {
        dispatch(getProductsAsync())
        return () => {
            dispatch(reset())
        }
    }, [])

    return <ProductsList status={status}></ProductsList>
}
