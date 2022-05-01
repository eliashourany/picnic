import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../stores/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
