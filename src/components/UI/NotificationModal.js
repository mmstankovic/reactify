import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from '../../store/login-slice'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#AACBFF',
    color: '#fff',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 4
};

const NotificationModal = () => {
    const dispatch = useDispatch()
    const notification = useSelector(state => state.login.notification)
    const isVisible = useSelector(state => state.login.isVisible)

    const closeNotificationModal = () => {
        dispatch(loginActions.cancelNotificationModal())
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isVisible}
            onClose={closeNotificationModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={isVisible}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        {notification && notification.status}
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        {notification && notification.message}
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    )
}
export default NotificationModal