import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import useStyles from './styles';
import { Avatar, Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import Input from "./Input";
import { signin, signup } from "../../actions/sign";

const initial = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Signup = () => {
    const classes = useStyles();
    const [password, setPassword] = useState(false)
    const [signed, setIsSigned] = useState(false)
    const [formData, setFormData] = useState(initial)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (signed) {
            dispatch(signup(formData, navigate))
        } else {

            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const redirectSignUp = () => { 
        setFormData(initial)
        setIsSigned((prev) => !prev)
        setPassword(false); 
    }

    const handleVisiblityPass = () => {
        setPassword((prevPass) => !prevPass)
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{signed ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {signed && (
                            <>
                                <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus />
                                <Input name='lastName' label="Last Name" handleChange={handleChange} />

                            </>
                        )}
                        <Input name='email' label="Email" handleChange={handleChange} type="email" />
                        <Input name='password' label="Password" handleChange={handleChange} type={password ? "text" : "password"} handleVisiblityPass={handleVisiblityPass} />
                        {signed && <Input name='confirmPassword' label="Confirm Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{signed ? 'Sign Up' : 'Sign In'}</Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={redirectSignUp}>
                                {signed ? 'Exiating user, please sign in' : ' Try creating an account'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Signup;
