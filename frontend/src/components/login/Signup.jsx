import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Box, TextField, Typography, Button, styled } from "@mui/material";

import { authenticateSignup } from "../../service/api";



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
    width: 271px;
    display: flex;
    flex-direction: column;
    padding: 31px 50px;
    flex: 1;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const SignupButton = styled(Button)(({ theme, color = 'primary' }) => ({
    textTransform: "none",
    background: "#FB641B",
    color: "#fff",
    height: "48px",
    borderRadius: "2px",
    ':hover': {
        backgroundColor: '#2874f0',
    },
}));
const LoginAccount = styled(Typography)`
    font-size: 14px;
    text-align: center;
    color: #2874f0;
    font-weight: 600;
    cursor: pointer;
`;



const SignupDialog = () => {

    const history = useNavigate();
    const [signup, setSignup] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: ""
    });




    const handleSignupChange = (e) => {
        setSignup(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    const signupUser = async () => {
        let response = await authenticateSignup(signup);
        if (!response) return;
        return response;
    };
    const handleSignupSubmit = (e) => {
        e.preventDefault();
        signupUser().then(() => history("/login"));
    };



    return (

        <Component style={{ marginTop: 120 }}>
            <Box style={{ display: "flex", height: "100%" }}>
                <Image>
                    <Typography variant="h5">Looks like you're new here!</Typography>
                    <Typography style={{ marginTop: 20 }}>Sign up with your mobile number to get started</Typography>
                </Image>
                {
                    <form onSubmit={handleSignupSubmit}>
                        <Wrapper>
                            <TextField variant="standard" value={signup.firstname} onChange={handleSignupChange} name="firstname" label="Enter Firstname" style={{ marginTop: "5px" }} />
                            <TextField variant="standard" value={signup.lastname} onChange={handleSignupChange} name="lastname" label="Enter Lastname" style={{ marginTop: "5px" }} />
                            <TextField variant="standard" value={signup.username} onChange={handleSignupChange} name="username" label="Enter Username" style={{ marginTop: "5px" }} />
                            <TextField type={"email"} variant="standard" value={signup.email} onChange={handleSignupChange} name="email" label="Enter Email" style={{ marginTop: "5px" }} />
                            <TextField type={"password"} variant="standard" value={signup.password} onChange={handleSignupChange} name="password" label="Enter Password" style={{ marginTop: "5px" }} />

                            <SignupButton type={"submit"} style={{ marginTop: "30px" }} /*onClick={() => signupUser()}*/>Continue</SignupButton>
                            <Link to={"/login"} style={{ marginTop: 30, textDecoration: "none" }}>
                                <LoginAccount >Already have account?Login account</LoginAccount>
                            </Link>
                        </Wrapper>
                    </form>
                }
            </Box>
        </Component>

    )
}

export default SignupDialog;
