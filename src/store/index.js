import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './login-slice'

export const store = configureStore({
    reducer: {
        login: loginReducer
    }
})