import AuthForm from "./AuthForm";
import Welcome from "./Welcome";
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

const Auth = () => {
    return (
        <Paper variant='outlined'>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <AuthForm />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Welcome />
                </Grid>
            </Grid>
        </Paper>
    )
}
export default Auth