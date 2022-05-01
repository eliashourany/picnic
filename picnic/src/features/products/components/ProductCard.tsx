import { Product } from '../types'
import styles from './ProductCard.module.css'
import clsx from 'clsx'
import {
    useCallback,
    useId,
    useMemo,
    useRef,
    useState,
    MouseEvent,
} from 'react'
import { windowSize } from '../../../hooks/useWindowSize'
import { Lightbox } from '../../../components/lightbox/Lightbox'
import { Link } from 'react-router-dom'
import useMediaQuery from '../../../hooks/useMediaQuery'
import { Modal } from '../../../components/modal/Modal'
import {
    getProductDetailsAsync,
    reset,
    selectProductDetailsStatus,
} from '../../productDetails/slices/ProductDetailsSlice'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { ProductDetails } from '../../productDetails/components/ProductDetails'

export type ProductProps = {
    product: Product
    className?: string
    windowSize?: windowSize
}

export const ProductCard = ({
    product,
    className = '',
    windowSize,
}: ProductProps) => {
    const [productElm, setProductElm] = useState<HTMLDivElement | null>(null)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const isNotMobile = useMediaQuery('(min-width: 600px)')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dispatch = useAppDispatch()
    const productDetailsStatus = useAppSelector(selectProductDetailsStatus)
    const imageHeight = useMemo(() => {
        if (productElm) {
            return productElm.clientWidth * 1.25
        }
        return '8rem'
    }, [productElm?.clientWidth, windowSize?.width])

    const openLightbox = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setLightboxOpen(true)
    }, [])

    const closeLightbox = useCallback(() => {
        setLightboxOpen(false)
    }, [])

    const openDetailsModal = useCallback(() => {
        dispatch(getProductDetailsAsync(product.product_id))
        setIsModalOpen(true)
    }, [dispatch, product.product_id])

    const closeDetailsModal = useCallback(() => {
        dispatch(reset())
        setIsModalOpen(false)
    }, [dispatch])

    return (
        <>
            <div
                className={clsx(styles.product, className)}
                ref={(el) => setProductElm(el)}
            >
                {isNotMobile ? (
                    <button
                        className={styles['product__button-overlay']}
                        onClick={openDetailsModal}
                    >
                        {product.name}
                    </button>
                ) : (
                    <Link
                        to={product.product_id}
                        className={styles['product__link-overlay']}
                    >
                        {product.name}
                    </Link>
                )}

                <button
                    onClick={openLightbox}
                    className={styles['product__image-container']}
                    aria-label="view product image"
                >
                    <img
                        src={product.image}
                        alt={product.name + ' image'}
                        className={styles.product__image}
                        style={{ height: imageHeight }}
                        loading="lazy"
                    />
                </button>
                <div className={styles.product__description}>
                    <h2 className={styles.product__title}>{product.name}</h2>
                    <p className={styles.product__subtitle}>${product.price}</p>
                </div>
            </div>

            <Lightbox
                isOpen={lightboxOpen}
                close={closeLightbox}
                imageSrc={product.image}
                imageAlt={product.name}
            />

            {isModalOpen && (
                <Modal onModalClose={closeDetailsModal}>
                    <Modal.Header> </Modal.Header>
                    <Modal.Body>
                        <ProductDetails status={productDetailsStatus} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Modal.CloseBtn>Close</Modal.CloseBtn>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}
