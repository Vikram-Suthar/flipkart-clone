import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


import { Box, TextField, Typography, Button, styled } from "@mui/material";

import { authenticateLogin } from "../../service/api";


const Component = styled(Box)`
    height: 70vh;
    width: 90vh;
    margin: auto;
    border: 1px solid #2874f0
`;
const Image = styled(Box)`
    background: #2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
    height: 80%;
    width: 30%;
    padding: 45px 35px;
    & > p, & > h5 {
        color: #FFFFFF;
    }
`;

const Wrapper = styled(Box)`

    display: flex;
    flex-direction: column;
    padding: 26px 36px;
    flex: 1;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)(() => ({
    textTransform: "none",
    background: "#FB641B",
    color: "#fff",
    height: "48px",
    borderRadius: "2px",
    ':hover': {
        backgroundColor: '#2874f0',
    },
}));

const RequestButton = styled(Button)`
    text:transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;
const Text = styled(Typography)`
    font-size: 12px;
    color: #878787;
`;
const CreateAccount = styled(Typography)`
    font-size: 14px;
    text-align: center;
    color: #2874f0;
    font-weight: 600;
    cursor: pointer;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;



const LoginDialog = () => {
    const history = useNavigate();

    const [login, setLogin] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(false);

    
    const handleLoginChange = (e) => {
        setLogin(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    const loginUser = async () => {
        let response = await authenticateLogin(login);
        if (!response) return;
        // console.log(response.data);
        return response;
    };
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        loginUser().then(() => history("/user"));
    };


    return (

        <Component style={{ marginTop: 120 }}>
            <Box style={{ display: "flex", height: "100%" }}>
                <Image>
                    <Typography variant="h5">Login</Typography>
                    <Typography style={{ marginTop: 20 }}>Get access to your Orders, Wishlist and Recommendations</Typography>
                </Image>
                {

                    <form onSubmit={handleLoginSubmit}>
                        <Wrapper>
                            <TextField type={"email"} variant="standard" value={login.email} onChange={handleLoginChange} name="email" label="Enter Email" />
                            {error && <Error>Please enter valid Email or Password</Error>}
                            <TextField type={"password"} variant="standard" value={login.password} onChange={handleLoginChange} name="password" label="Enter Password" />
                            <Text>By continuing, you agree to Flipkart"s Terms of Use and Privacy Policy.</Text>
                            <LoginButton type={"submit"} >Login</LoginButton>
                            <Typography style={{ textAlign: "center" }}>OR</Typography>
                            <RequestButton style={{ marginTop: 0 }} >Request OTP</RequestButton>
                            <Link to={"/signup"} style={{ marginTop: 30, textDecoration: "none" }}>
                                <CreateAccount >New to Flipkart? Create an account</CreateAccount>
                            </Link>

                        </Wrapper>
                    </form>

                }
            </Box>
        </Component>

    )
}

export default LoginDialog;
