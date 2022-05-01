import withLoading from '../../../hoc/withLoading'
import { ProductsSearch } from './ProductsSearch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { selectProducts, selectProductsSearch } from '../slices/ProductsSlice'
import { useMemo } from 'react'
import { useDebounce } from '../../../hooks/useDebounce'
import styles from './ProductList.module.css'
import { ProductCard } from './ProductCard'
import { useWindowSize } from '../../../hooks/useWindowSize'

export const ProductsList = withLoading(() => {
    const products = useAppSelector(selectProducts)
    const search = useAppSelector(selectProductsSearch)
    const debouncedSearch = useDebounce(search, 300)
    const windowSize = useWindowSize()

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            return product.name
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase())
        })
    }, [products, debouncedSearch])

    return (
        <>
            <ProductsSearch />
            <section aria-label="list of products" className={styles.container}>
                {filteredProducts.map((product) => (
                    <ProductCard
                        product={product}
                        key={product.product_id}
                        className={styles.product}
                        windowSize={windowSize}
                    />
                ))}
            </section>
        </>
    )
})
