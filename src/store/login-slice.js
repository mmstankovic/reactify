import { createSlice } from '@reduxjs/toolkit'
import { retrieveStoredToken } from '../utils/calculate-duration'

const tokenData = retrieveStoredToken()
let initialEmail = ''
let initialToken = null

if(tokenData) {
    initialToken = tokenData.token
    initialEmail = tokenData.email
}

const initialState = {
    email: initialEmail,
    token: initialToken,
    notification: null,
    isVisible: false
}

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.email = action.payload.email
            state.token = action.payload.token
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('expirationTime', action.payload.expirationTime)
            localStorage.setItem('email', action.payload.email)
        },
        logout: (state) => {
            state.token = null 
            state.notification = null
            localStorage.removeItem('token')
            localStorage.removeItem('expirationTime')
            localStorage.removeItem('email')
        },
        showNotification: (state, action) => {
            state.notification = {
                status: action.payload.status,
                message: action.payload.message,
                isLoading: action.payload.isLoading
            }
        },
        cancelNotificationModal: (state) => {
            state.isVisible = false
            state.notification = null
        },
        showNotificationModal: (state) => {
            state.isVisible = true
        }
    }
})

export const loginActions = loginSlice.actions

export default loginSlice.reducer
