import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { useLocation, Link as RouterLink } from 'react-router-dom'

const Welcome = () => {
    const notification = useSelector(state => state.login.notification)
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const isLogin = searchParams.get('mode') === 'signin'

    if(notification) {
        const { isLoading, status } = notification
        if(isLoading && status !== 'error') {
            return (
                <Box style={{ backgroundColor: '#AACBFF', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '2rem 0' }}>
                    <Typography sx={{ fontWeight: 'bold' }} variant='h5' gutterBottom>Sending...</Typography>
                </Box>
            )
        }
    }
    
    return (
        <Box style={{ backgroundColor: '#AACBFF', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '2rem 0' }}>
            <Typography sx={{ fontWeight: 'bold' }} variant='h5' gutterBottom>Welcome !</Typography>
            <Typography variant='body2' gutterBottom>{isLogin ? "You don't have an account ?" : "You have an account ?"}</Typography>
            <Typography variant='body2'>{isLogin ? 'Please Sign Up from here' : 'Please Sign In from here'}</Typography>
            <Button component={RouterLink} variant="contained" to={`?mode=${isLogin ? 'signup' : 'signin'}`} sx={{ marginTop: '1.3rem', backgroundColor: '#2296F3', color: '#fff', border: 'none', outline: 'none', padding: '6px 14px', borderRadius: '20px', fontWeight: 'bold' }}>
                {isLogin ? 'Sign Up' : 'Sign In'}
            </Button>
        </Box>
    )
}
export default Welcome