export const calculateRemainigTime = (expirationTime) => {
    const currentTime = new Date().getTime()
    const adjustedExpirationTime = new Date(expirationTime).getTime()

    const remainigDuration = adjustedExpirationTime - currentTime

    return remainigDuration
}

export const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token')
    const storedExpirationTime = localStorage.getItem('expirationTime')
    const storedUserEmail = localStorage.getItem('email')

    const remainigTime = calculateRemainigTime(storedExpirationTime)

    if (remainigTime < 3000) {
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')
        return null
    }

    return {
        token: storedToken,
        duration: remainigTime,
        email: storedUserEmail
    }
}