import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'

import Navigation from './Navigation'

const Header = () => {
    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <Navigation />
            </AppBar>
        </>
    )
}
export default Header