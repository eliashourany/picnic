import { axios } from '../../../lib/axios'
import { ProductDetails } from '../types'

export const getProductDetails = (
    productId: string
): Promise<ProductDetails> => {
    return axios.get(`${productId}/detail`)
}
