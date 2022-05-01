import { STATUS } from '../../../utils/status'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../../stores/store'
import { getProductDetails } from '../api/getProductDetails'
import { ProductDetails } from '../types'

export interface ProductsState {
    productDetails: ProductDetails | null
    status: STATUS
}

const initialState: ProductsState = {
    productDetails: null,
    status: STATUS.LOADING,
}

export const getProductDetailsAsync = createAsyncThunk(
    'products/getProductDetails',
    async (productId: string) => {
        return await getProductDetails(productId)
    }
)

export const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        reset: (state) => {
            state = { ...initialState }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductDetailsAsync.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(getProductDetailsAsync.fulfilled, (state, action) => {
                state.status = STATUS.IDLE
                state.productDetails = action.payload
            })
            .addCase(getProductDetailsAsync.rejected, (state) => {
                state.status = STATUS.FAILED
            })
    },
})

export const { reset } = productDetailsSlice.actions

export const selectProductDetails = (state: RootState) =>
    state.productDetails.productDetails
export const selectProductDetailsStatus = (state: RootState) =>
    state.productDetails.status

export default productDetailsSlice.reducer
