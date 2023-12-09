import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    
    if (!cookies) {
        return res.status(400).json({ message: "login again" });
    }
    const token = cookies.split("=")[1];
    if (!token) {
        return res.status(400).json({ message: "token not found" });
    }
    jwt.verify(
        String(token),
        process.env.ACCESS_TOKEN_SECRET,
        (error, user) => {
            if (error) {
                return res.status(400).json({ message: "Invalid Token" });
            }
            req.id = user._id;
        }
        );

    next();
};
