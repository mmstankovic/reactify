import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginActions } from '../../store/login-slice'
//
import { useState } from 'react'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { signOutUser } from '../../store/login-actions'
import { useHistory } from 'react-router-dom'


//MyDrawer brisem 

const Navigation = () => {
    const token = useSelector((state) => state.login.token)
    const userIsLoggedIn = !!token
    const dispatch = useDispatch()
    const history = useHistory()

    const logoutUserHandler = () => {
        dispatch(signOutUser())
        history.replace('/auth')
    }

    return (
        <Toolbar>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                Reactify
            </Typography>
            <nav>
                <Link variant="button" component={RouterLink} to='/' underline='none' color='inherit' sx={{ my: 1, mx: 1.5 }}>Home</Link>
                {!userIsLoggedIn && <Link variant="button" component={RouterLink} to='/auth?mode=signin' underline='none' color='inherit' sx={{ my: 1, mx: 1.5 }}>Auth</Link>}
                {userIsLoggedIn && <Link variant="button" component={RouterLink} to='/profile' underline='none' color='inherit' sx={{ my: 1, mx: 1.5 }}>Profile</Link>}
                {userIsLoggedIn && <Button variant='outlined' onClick={logoutUserHandler} color='inherit'>Logout</Button>}
            </nav>
        </Toolbar>
    )
}
export default Navigation

/*
<Toolbar>
    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        Reactify
    </Typography>
    <nav>
        <Link variant="button" component={RouterLink} to='/' underline='none' color='inherit' sx={{my: 1, mx: 1.5}}>Home</Link>
        {!userIsLoggedIn && <Link variant="button" component={RouterLink} to='/auth?mode=signin' underline='none' color='inherit' sx={{my: 1, mx: 1.5}}>Auth</Link>}
        {userIsLoggedIn && <Link variant="button" component={RouterLink} to='/profile' underline='none' color='inherit' sx={{my: 1, mx: 1.5}}>Profile</Link>}
        {userIsLoggedIn && <Button variant='outlined' onClick={logoutUserHandler}>Logout</Button>}
    </nav>
</Toolbar>
*/