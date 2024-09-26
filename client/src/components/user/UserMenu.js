import { Logout, Settings } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useValue } from "../../context/ContextProvider";

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu, }) => {
    const { dispatch } = useValue();
    const handleCloseUserMenu = () => {
        setAnchorUserMenu(null);
    };

    return (
        <Menu
            anchorEl={anchorUserMenu}
            open={Boolean(anchorUserMenu)}
            onClose={handleCloseUserMenu}
            onClick={handleCloseUserMenu}>
            <MenuItem >
                <ListItemIcon>
                    <Settings font-size="small" />
                </ListItemIcon>
                Profile
            </MenuItem>
            <MenuItem >
                <ListItemIcon onClick={() => dispatch({ type: "UPDATE_USER", payload: null })}>
                    <Logout font-size="small" />
                </ListItemIcon>
                Log out
            </MenuItem>

        </Menu>
    )
};

export default UserMenu;