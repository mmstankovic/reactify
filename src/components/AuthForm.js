import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button'
import Link from '@mui/material/Link';
import NotificationModal from './UI/NotificationModal';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { signUpUser } from '../store/login-actions';
import loginIllustration from '../images/login_illustration.jpg'
import useInput from '../hooks/use-input'

const isEmail = value => value.includes('@')
const isMoreThanSix = value => value.trim().length > 6

const AuthForm = () => {
    const {
        value: enteredEmail,
        valueIsValid: enteredEmailIsValid,
        inputHasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailInputBlurHandler
    } = useInput(isEmail)

    const {
        value: enteredPassword,
        valueIsValid: enteredPasswordIsValid,
        inputHasError: passwordInputHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordInputBlurHandler
    } = useInput(isMoreThanSix)

    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const isLogin = searchParams.get('mode') === 'signin'

    let formIsValid = false

    if (enteredEmailIsValid && enteredPasswordIsValid) {
        formIsValid = true
    }

    const formSubmitHandler = (e) => {
        e.preventDefault()
        let url

        const userData = {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
        }

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkhccP-ZnWGF6o1xZ7u7DLooBB7bog4g4'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkhccP-ZnWGF6o1xZ7u7DLooBB7bog4g4'
        }

        if (formIsValid) {
            dispatch(signUpUser(url, userData, history))
        }
    }

    return (
        <>
            <NotificationModal />
            <Box sx={{ padding: '20px', justifyContent: 'center' }} onSubmit={formSubmitHandler}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img width='350px' src={loginIllustration} alt='login illustration' />
                    <Typography variant='h6' sx={{ textAlign: 'center', color: '#2C3F51', marginBottom: '2rem' }} gutterBottom>{isLogin ? 'Sign In' : 'Sign Up'}</Typography>
                </Box>
                <Box component='form' style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <TextField
                        error={emailInputHasError}
                        helperText={emailInputHasError && 'Please enter a valid email adress!'}
                        type='email'
                        size='small'
                        required
                        fullWidth
                        id="email"
                        name="email"
                        placeholder='Email'

                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon fontSize='small' />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ backgroundColor: '#F0F0F0' }}
                        onChange={emailChangeHandler}
                        onBlur={emailInputBlurHandler}
                    />
                    <TextField
                        error={passwordInputHasError}
                        helperText={passwordInputHasError && 'Password must be greater than 6 characters!'}
                        type='password'
                        size='small'
                        required
                        fullWidth
                        id="password"
                        name="password"
                        placeholder='Password'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon fontSize='small' />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ backgroundColor: '#F0F0F0' }}
                        onChange={passwordChangeHandler}
                        onBlur={passwordInputBlurHandler}
                    />
                    <Button
                        disabled={!formIsValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ fontWeight: 'bold' }}
                    >
                        {isLogin ? 'SIGN IN' : 'SIGN UP'}
                    </Button>
                    <Link href='#' underline="none" sx={{ textAlign: 'center' }}>
                        Forgot your password?
                    </Link>
                </Box>
            </Box>
        </>
    )
}
export default AuthForm
//https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=1060&t=st=1692955790~exp=1692956390~hmac=34f4a80ee4c95bc25498905f847ecec2b65fdb15935d8f20205e9a2ddfa276c0