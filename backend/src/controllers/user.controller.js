import {User} from "../models/user.model.js";
import jwt from "jsonwebtoken";

// import bcrypt from "bcrypt";

export const userSignup = async (req, res) => {
    const user = req.body;
    const { email, password, username } = req.body;
    let existingUser;
    let existingUsername;
    try {
        if (!email || !password || !username) {
            return res.status(400).json({ message: "Email, Username and Password is required" });
        }
    } catch (error) {
        res.status(500).json("Error", error.message);
    }
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        return new Error(error);
    }
    if (existingUser) {
        return res.status(401).json({ message: "Email alredy exist" });
    }
    try {
        existingUsername = await User.findOne({ username: username });
    } catch (error) {
        return new Error(error);
    }
    if (existingUsername) {
        return res.status(401).json({ message: "Username alredy exist" });
    }
    const newUser = new User(user);
    try {
        await newUser.save();
    } catch (error) {
        return new Error(error);
    }
    return res.status(200).json({ message: newUser });
};

export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password is required" });
        }
    } catch (error) {
        res.status(500).json("Error", error.message);
    }
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        return new Error(error);
    }
    if (!existingUser) {
        return res.status(401).json({message: "User not found. Signup Please"});
    }
    const isPasswordCorrect = await existingUser.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        return res.status(401).json({message: "Invalid Email / Password"});
    }
    if (req.cookies[`${existingUser._id}`]) {
        req.cookies[`${existingUser._id}`] = ""
    }
    const token = await existingUser.generateAccessToken()


    res.cookie(String(existingUser._id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 35),
        httpOnly: true,
        sameSite: "lax"
    });
    return res.status(200).json({message: "Successfully Logged In", token: token});

};

export const getUser = async (req, res) => {
    const userId = req.id;
    
    let user;
    try {
        user = await User.findById(userId,"-password");
        if (!user) {
            return res.status(401).json({message: "User not found."});        
        }
    } catch (error) {
        return new Error(error);        
    }
    return res.status(200).json({user});

};

export const refreshToken = async (req, res, next) => {
    
    const cookies = req.headers.cookie;
    
    if (!cookies) {
        return res.status(400).json({ message: "login again" });
    }
    const prevToken = cookies.split("=")[1];

    if (!prevToken) {
        return res.status(400).json({ message: "token not found" });
    }
    jwt.verify(
        String(prevToken),
        process.env.ACCESS_TOKEN_SECRET,
        (error, user) => {
            if (error) {
                return res.status(403).json({ message: "Authentication failed" });
            }
            
            res.clearCookie(`${user._id}`);
            req.cookies[`${user._id}`] = "";

            const token = jwt.sign({_id: user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn: process.env.ACCESS_TOKEN_EXPIRY,});
    
            res.cookie(String(user._id), token, {
                path: "/",
                expires: new Date(Date.now() + 1000 * 35),
                httpOnly: true,
                sameSite: "lax"
            });
            
            req.id = user._id;

            next();
        }
    );
};

// logout
export const userLogout = async (req, res) => {
  
    res.clearCookie(`${req.id}`);
    req.cookies[`${req.id}`] = "";

    return res.status(200).json({message: "Successfully logged out"})
};
// edit and delete
/*
export const userEdit = async (req, res) => {
    try {

        let payload = {};
        if (req.body.firstname) {
            Object.assign(payload, { firstname: req.body.firstname });
        }
        if (req.body.lastname) {
            Object.assign(payload, { lastname: req.body.lastname });
        }
        if (req.body.username) {
            Object.assign(payload, { username: req.body.username });
        }
        if (req.body.email) {
            Object.assign(payload, { email: req.body.email });
        }
        if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
                Object.assign(payload, { password: req.body.password });
            
        }

        const update = await User.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {
            new: true,
        });
        res.status(200).json(update);
    } catch (error) {
        res.status(500).send("internal server error");
        console.log(error.message);
    }
};

export const userDelete = async (req, res) => {
    try {
        const _id = req.params.id;
        let deleteuser = await User.findOneAndDelete({ _id: _id });
        res.status(200).json(deleteuser);
    } catch (error) {
        res.status(500).send("internal server error");
        console.log(error.message);
    }
};
*/
