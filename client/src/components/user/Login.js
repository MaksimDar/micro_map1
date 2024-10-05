
import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, DialogActions, Button } from "@mui/material";
import { Close, Send } from "@mui/icons-material";
import React, { useState, useRef, useEffect } from "react";
import { useValue } from "../../context/ContextProvider";
import UserPassword from "./UserPassword";
import GoogleLogin from "./GoogleLogin";
import { register } from "../../actions/user";

const Login = () => {
    const { state: { openLogin }, dispatch } = useValue();
    const [title, setTitle] = useState('Login');
    const [isRegister, setIsRegister] = useState(false);
    const name = useRef();
    const surname = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const handleClose = () => {
        dispatch({ type: 'CLOSE_LOGIN' });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //test notification 
        // const passwordRef = password.current.value;
        // const confirmRef = confirmPassword.current.value;
        // if (passwordRef !== confirmRef) {
        //     dispatch({ type: 'UPDATE_ALERT', payload: { open: true, severity: 'error', message: 'Passwords are not the same' } })
        // };
        // //test Loading
        // dispatch({ type: 'START_LOADING' });
        // setTimeout(() => {
        //     dispatch({ type: 'END_LOADING' });
        // }, 6000)

        const emailSubmit = email.current.value;
        const passwordSubmit = password.current.value;
        // send the login request if it is not registered and return 
        const nameSubmit = name.current.value;
        const confirmPasswordSubmit = confirmPassword.current.value;
        if (passwordSubmit !== confirmPasswordSubmit)
            return dispatch({ type: 'UPDATE_ALERT', payload: { open: true, severity: 'error', message: 'Passwords are not the same' } });
        register({ name: nameSubmit, email: emailSubmit, password: passwordSubmit }, dispatch);
        console.log(`Login body is ${nameSubmit}, ${emailSubmit}, ${passwordSubmit}, ${confirmPasswordSubmit}`);

    };
    useEffect(() => {
        isRegister ? setTitle("Register") : setTitle("Login");
    }, [isRegister]);

    return (
        <Dialog
            open={openLogin}
            onClose={handleClose}>
            <DialogTitle>
                {title}
                <IconButton sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: (theme) => theme.palette.grey[500]
                }} onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <DialogContentText>
                        Please fill your information in the fields below:
                    </DialogContentText>
                    {isRegister &&
                        <TextField
                            autoFocus
                            margin='normal'
                            variant="standard"  // corrected here
                            id='name'
                            label='Name'
                            type='text'
                            fullWidth
                            inputRef={name}
                            inputProps={{ minLength: 2 }}
                            required />
                    }
                    <TextField
                        autoFocus={!isRegister}
                        margin='normal'
                        variant="standard"  // corrected here
                        id='email'
                        label='Email'
                        type='text'
                        fullWidth
                        inputRef={email}
                        inputProps={{ minLength: 2 }}
                        required />
                    <UserPassword password={password} />
                    {isRegister && (
                        <UserPassword
                            password={confirmPassword}
                            id='confirmPassword'
                            label='Confirm Password'
                        />
                    )}
                </DialogContent>
                <DialogActions sx={{ px: '19px' }}>
                    <Button type='submit' variant='contained' endIcon={<Send />}>  {/* corrected variant typo */}
                        Submit
                    </Button>
                </DialogActions>
            </form>
            <DialogActions>
                {isRegister ? "Do you have an account? Sign in " : "Don't you have an account? Create now "}
                <Button
                    sx={{ justifyContent: 'left', p: '5px 24px' }}
                    onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? 'Login' : 'Register'}
                </Button>
            </DialogActions>
            <DialogActions sx={{ justifyContent: 'center', py: '24px' }}>
                <GoogleLogin />
            </DialogActions>
        </Dialog>
    )
};

export default Login;
