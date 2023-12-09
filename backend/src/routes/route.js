import express from "express";

import {
    userSignup,
    userLogin,
    getUser,
    refreshToken,
    userLogout
    // userDelete,
    // userEdit,
} from "../controllers/user.controller.js";
import { getProducts, getProductById } from "../controllers/product.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";



const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken,verifyToken,getUser);
router.post("/logout", verifyToken, userLogout);

// router.patch('/edit/:id', userEdit);
// router.delete("/delete/:id", userDelete);

router.get('/products', getProducts);
router.get('/product/:id', getProductById);



export default router;
