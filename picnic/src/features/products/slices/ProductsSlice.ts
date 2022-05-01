import { STATUS } from '../../../utils/status'
import { Product } from '../types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getProductsList } from '../api/getProductsList'
import { RootState } from '../../../stores/store'

export interface ProductsState {
    products: Product[]
    status: STATUS
    search: string
}

const initialState: ProductsState = {
    products: [],
    status: STATUS.LOADING,
    search: '',
}

export const getProductsAsync = createAsyncThunk(
    'products/getProductsList',
    async () => {
        const response = await getProductsList()
        // The value we return becomes the `fulfilled` action payload
        return response.products
    }
)

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        reset: (state) => {
            state = { ...initialState }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductsAsync.pending, (state) => {
                state.status = STATUS.LOADING
            })
            .addCase(getProductsAsync.fulfilled, (state, action) => {
                state.status = STATUS.IDLE
                state.products = action.payload
            })
            .addCase(getProductsAsync.rejected, (state) => {
                state.status = STATUS.FAILED
            })
    },
})

export const { setSearch, reset } = productsSlice.actions

export const selectProducts = (state: RootState) => state.products.products
export const selectProductsStatus = (state: RootState) => state.products.status
export const selectProductsSearch = (state: RootState) => state.products.search

export default productsSlice.reducer
