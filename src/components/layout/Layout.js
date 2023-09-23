import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer'

const Layout = (props) => {
    const defaultTheme = createTheme()
    return (
        <ThemeProvider theme={defaultTheme}>
            <Header />
            <main>
                <Container maxWidth='md' sx={{ pt: 8, pb: 6, minHeight: '100vh' }}>{props.children}</Container>
            </main>
            <Footer />
        </ThemeProvider>
    )
}
export default Layout