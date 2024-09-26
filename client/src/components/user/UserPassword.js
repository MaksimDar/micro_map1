import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField } from '@mui/material';
import { IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";

const UserPassword = ({ password, id = 'password', label = 'Password' }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClick = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDown = (event) => {
        event.preventDefault();
    }
    return (
        <TextField
            margin='normal'
            variant="standard"
            id={id}
            label={label}
            type={showPassword ? 'text' : 'password'}
            fullWidth
            inputRef={password}
            inputProps={{ minLength: 6 }}
            required
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>

                    </InputAdornment>
                )
            }}
        />
    );
};

export default UserPassword;
