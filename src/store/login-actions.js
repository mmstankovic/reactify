import { loginActions } from "./login-slice"
import { retrieveStoredToken } from '../utils/calculate-duration'
import { calculateRemainigTime } from '../utils/calculate-duration'

let logoutTimer

export const signOutUser = () => {
    return (dispatch) => {
        dispatch(loginActions.logout())

        if (logoutTimer) {
            clearTimeout(logoutTimer)
        }
    }
}

export const signUpUser = (url, userData, history) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            dispatch(loginActions.showNotification({
                status: 'pending',
                message: 'Sending...',
                isLoading: true
            }))
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userData.email,
                    password: userData.password,
                    returnSecureToken: userData.returnSecureToken
                })
            })

            if (!response.ok) {
                let errorMessage = 'Authentication failed !'
                const errorData = await response.json()

                if (errorData && errorData.error && errorData.error.message) {
                    errorMessage = errorData.error.message
                }

                throw new Error(errorMessage)
            }
            const data = await response.json()

            return data
        }
        try {
            const userInfo = await sendRequest()
            dispatch(loginActions.showNotification({
                status: 'success',
                message: 'Login Success',
                isLoading: false
            }))
            const expirationTime = new Date(new Date().getTime() + +userInfo.expiresIn * 1000)
            dispatch(loginActions.login({ email: userInfo.email, token: userInfo.idToken, expirationTime: expirationTime.toISOString() }))
            history.replace('/profile')

            const remainigDuration = calculateRemainigTime(expirationTime)
            
            logoutTimer = setTimeout(() => {
                dispatch(loginActions.logout())
            }, remainigDuration)
        } catch (err) {
            console.log(err.message)
            dispatch(loginActions.showNotification({
                status: 'error',
                message: err.message,
                isLoading: false
            }))
            dispatch(loginActions.showNotificationModal())
        }
    }
}

export const changeUserPassword = (newPassword, token, history) => {
    return async (dispatch) => {
        const sendNewPasswordRequest = async () => {
            dispatch(loginActions.showNotification({
                status: 'pending',
                message: 'Sending new credentials',
                isLoading: true
            }))
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDkhccP-ZnWGF6o1xZ7u7DLooBB7bog4g4', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idToken: token,
                    password: newPassword,
                    returnSecureToken: false
                })
            })

            if (!response.ok) {
                let error = 'Change password failed !'
                const errorData = await response.json()

                if(errorData && errorData.error && errorData.error.message) {
                    error = errorData.error.message
                }
                throw new Error(error)
            }

            const data = await response.json()
            return data
        }
        try {
            const userData = await sendNewPasswordRequest()
            if (userData) {
                dispatch(loginActions.showNotification({
                    status: 'success',
                    message: 'Password changed successfully',
                    isLoading: false
                }))
                history.replace('/')
                dispatch(loginActions.showNotificationModal())//
            }
        } catch (err) {
            console.log(err.message)
            dispatch(loginActions.showNotification({
                status: 'error',
                message: err.message,
                isLoading: false
            }))
            dispatch(loginActions.showNotificationModal())
        }
    }
}

export const checkTokenIsValid = () => {
    const tokenData = retrieveStoredToken()
    
    return (dispatch) => {
        logoutTimer = setTimeout(() => {
            dispatch(loginActions.logout())
        }, tokenData.duration)
    }
}
