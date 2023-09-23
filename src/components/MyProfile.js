import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button'
import LockResetIcon from '@mui/icons-material/LockReset';
import { useRef } from 'react';
import { changeUserPassword } from '../store/login-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loading from './UI/Loading'
import Paper from '@mui/material/Paper'
import NotificationModal from './UI/NotificationModal';

const MyProfile = () => {
    const newPasswordInputRef = useRef()
    const repeatNewPasswordInputRef = useRef()
    const dispatch = useDispatch()
    const history = useHistory()

    const token = useSelector((state) => state.login.token)
    const user = useSelector((state) => state.login.email)
    const notification = useSelector(state => state.login.notification)

    const changePasswordHandler = e => {
        e.preventDefault()

        const enteredNewPassword = newPasswordInputRef.current.value
        const enteredRepeatedNewPassword = repeatNewPasswordInputRef.current.value

        if (enteredNewPassword !== enteredRepeatedNewPassword) {
            alert('Passwords did not match !')
            return
        }

        dispatch(changeUserPassword(enteredNewPassword, token, history))
    }

    return (
        <>
            <NotificationModal />
            <Container maxWidth='xs'>
                <Typography variant='h6' gutterBottom>
                    Welcome {user}
                </Typography>
                <Box component='form' onSubmit={changePasswordHandler}>
                    <Paper variant="outlined" sx={{ my: { xs: 2, md: 6 }, p: { xs: 2, md: 2 } }}>
                        <TextField
                            margin='normal'
                            type='password'
                            size='small'
                            required
                            fullWidth
                            id="new-password"
                            name="new-password"
                            placeholder='New Password'
                            autoFocus
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon fontSize='small' />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ backgroundColor: '#F0F0F0' }}
                            inputRef={newPasswordInputRef}
                        />
                        <TextField
                            type='password'
                            size='small'
                            required
                            fullWidth
                            id="repeat-password"
                            name="new-password"
                            placeholder='Repeat Password'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockResetIcon fontSize='small' />
                                    </InputAdornment>
                                )
                            }}
                            sx={{ backgroundColor: '#F0F0F0' }}
                            inputRef={repeatNewPasswordInputRef}
                        />
                        {notification && notification.isLoading && <Loading />}
                        <Button type='submit' variant='contained' sx={{ textTransform: 'none', mt: 2 }}>Change Password</Button>
                    </Paper>
                </Box>
            </Container>
        </>
    )
}
export default MyProfile