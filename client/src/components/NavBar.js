import React from "react";
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu, Lock } from "@mui/icons-material";

import { useValue } from "../context/ContextProvider";
import UserIcons from "./user/UserIcons";

const handleClick = () => {
    console.log('Hello Menu!');
};

const NavBar = () => {
    const { state: { currentUser }, dispatch } = useValue();
    return (
        <AppBar>
            <Container maxWidth="lg" >
                <Toolbar disableGutters>
                    <Box sx={{ mr: 1 }}>
                        <IconButton size='large' color='inherit' onClick={handleClick}>
                            <Menu />
                        </IconButton>
                    </Box>
                    <Typography
                        varient='h6'
                        component='h1'
                        noWrap
                        sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
                    >
                        You are welcome to Mobimap!
                    </Typography>
                    <Typography
                        varient='h6'
                        component='h1'
                        noWrap
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        MOBIMAP!
                    </Typography>
                    {!currentUser ? (<Button
                        color="inherit"
                        startIcon={<Lock />}
                        onClick={() => dispatch({ type: 'OPEN_LOGIN' })}>
                        Log in
                    </Button>) : (
                        <UserIcons />
                    )}

                </Toolbar>

            </Container>

        </AppBar>);
};

export default NavBar;