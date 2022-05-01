import { axios } from '../../../lib/axios'
import { Product } from '../types'

export const getProductsList = (): Promise<{ products: Product[] }> => {
    return axios.get('list')
}
