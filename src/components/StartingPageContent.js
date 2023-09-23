import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import NotificationModal from './UI/NotificationModal'

const StartingPageContent = () => {
    const notification = useSelector(state => state.login.notification)
    return (
        <>
            <Typography variant='h3' align='center' sx={{color:'#6B7A90'}}>Welcome to Reactify !</Typography>
            {notification && (notification.message.includes('changed')) && <NotificationModal />}
        </>
    )
}
export default StartingPageContent