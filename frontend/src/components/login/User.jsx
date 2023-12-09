import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../context/DataProvider';
import { Box, Typography } from "@mui/material";
import { getUser } from './refresh';



const User = () => {
    const { account, setAccount } = useContext(DataContext);

    useEffect(() => {
        if (!account) {
            getUser().then((data) => setAccount(data.user))
        }
        
    }, [])
    

    return (

        <Box style={{ height: "100vh", width: "100%", fontVariant: "all-petite-caps", backgroundColor: "blanchedalmond" }}>


            {account && <Typography style={{ margin: "5px 20px", fontSize: "20px" }} >firstname: {account.firstname}</Typography>}
            {account && <Typography style={{ margin: "5px 20px", fontSize: "20px" }} >lastname: {account.lastname}</Typography>}
            {account && <Typography style={{ margin: "5px 20px", fontSize: "20px" }} >id: {account._id}</Typography>}
            {account && <Typography style={{ margin: "5px 20px", fontSize: "20px" }} >email: {account.email}</Typography>}
            {account && <Typography style={{ margin: "5px 20px", fontSize: "20px" }} >username: {account.username}</Typography>}
            {!account && <Typography>Login Again</Typography>}


        </Box>

    )
}

export default User;