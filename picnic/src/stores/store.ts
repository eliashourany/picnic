import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import productsReducer from '../features/products/slices/ProductsSlice'
import productDetailsReducer from '../features/productDetails/slices/ProductDetailsSlice'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        productDetails: productDetailsReducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
