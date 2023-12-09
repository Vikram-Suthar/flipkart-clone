import { useState } from "react";
import { Box, Typography, Menu, MenuItem, styled } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import { logoutUserApi } from "../../service/api";

const Component = styled(Menu)`
    margin-top: 5px;
`;
const Logout = styled(Typography)`
    margin-left: 10px;
    font-size: 14px;
`;

const Profile = ({ account, setAccount }) => {
    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        setOpen(event.currentTarget);
    }
    const handleClose = () => {
        setOpen(false);
    }
   
    const logoutUser = async () => {
        const response = await logoutUserApi();
        if (!response) return;
        const data = await response.data;
        setAccount('');
        return data;
    };

  return (
    <>
        <Box onClick={handleClick} ><Typography style={{marginTop: 3, cursor: 'pointer'}} >{account.firstname}</Typography></Box>
        <Component
            anchorEl={open}
            open={Boolean(open)}
            onClose={handleClose}
        >
            <MenuItem onClick={() => { handleClose(); logoutUser();}}>
                <LogoutIcon color="primary" fontSize="small" />
                <Logout>Logout</Logout>
            </MenuItem>
            <MenuItem onClick={() => { handleClose() }}>
                <AccountCircleIcon color="primary" fontSize="small" />
                <Link to={"/user"} style={{textDecoration: "none", fontSize: "14px", marginLeft: "10px", color: "black"}}>Profile</Link>
            </MenuItem>
        </Component>
    </>
  )
}

export default Profile;