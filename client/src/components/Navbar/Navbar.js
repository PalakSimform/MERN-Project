import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import useStyles from './styles';
import logoPicutre from '../../images/nasa-logo.png';
import * as actionType from '../../constants/actionTypes'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from "react-redux";

const Navbar = () => {
    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT })
        navigate('/signup')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token
        if (token) {
            const decodedToken = jwtDecode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')))

    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.title} variant="h2" align="center">
                    <img className={classes.logo} src={logoPicutre} alt="logoPicutre" height="40" />
                    NASA Missions
                </Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/signup" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
