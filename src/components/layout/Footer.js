import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const Footer = () => {
    return (
        <Box component='footer' sx={{display:'flex', justifyContent:'center', my: 5}}>
            <Typography variant='body2'>Copyright © Milos Stankovic 2023.</Typography>
        </Box>
    )
}
export default Footer