import withLoading from '../../../hoc/withLoading'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { selectProductDetails } from '../slices/ProductDetailsSlice'
import styles from './ProductDetails.module.css'

export const ProductDetails = withLoading(() => {
    const product = useAppSelector(selectProductDetails)

    if (!product) {
        throw Error('Invalid product')
    }

    return (
        <div className={styles.product}>
            <div className={styles.product__details}>
                <h1 className={styles.product__title}>{product.name}</h1>
                <h5 className={styles.product__description}>
                    {product.description}
                </h5>
                <div className={styles.product__price}>${product.price}</div>
            </div>
            <div className={styles.product__image}>
                <img src={product.image} alt={product.name} />
            </div>
        </div>
    )
})
