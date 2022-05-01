import { Input } from '../../../components/input/Input'
import styles from './ProductsSearch.module.css'
import { useCallback } from 'react'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { selectProductsSearch, setSearch } from '../slices/ProductsSlice'
import { useAppDispatch } from '../../../hooks/useAppDispatch'

export const ProductsSearch = () => {
    const search = useAppSelector(selectProductsSearch)
    const dispatch = useAppDispatch()

    const onChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setSearch(event.target.value))
        },
        []
    )

    return (
        <section
            aria-label="search products"
            className={styles.container}
            role="search"
        >
            <Input label="Search Products" value={search} onChange={onChange} />
        </section>
    )
}
