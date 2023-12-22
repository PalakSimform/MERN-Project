import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const Input = ({ name, handleChange, autoFocus, label, type , handleVisiblityPass}) => {
    return (
        <Grid item xs={12} sm={12}>
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                autoFocus={autoFocus}
                label={label}
                type={type}
                InputProps = {name === 'password' && {
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={handleVisiblityPass}>
                                {type === 'password' ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </Grid>
    )
}

export default Input;