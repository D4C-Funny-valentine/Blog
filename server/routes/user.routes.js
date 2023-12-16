import express from "express";
import { verifyToken } from "../middleware/token.validation.js";
import userController from "../controllers/user.controller.js";
import favoriteController from "../controllers/favorite.controller.js";
import blogController from "../controllers/blog.controller.js";

const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.post("/logout", verifyToken, userController.logout);
router.get("/userinfo", verifyToken, userController.getInfo);
router.put("/update-password", verifyToken, userController.updatePassword);
router.put("/update-profile", verifyToken, userController.updateProfile);
router.post("/favorites/:id", verifyToken, favoriteController.addFavorite);
router.delete("/favorites/:id", verifyToken, favoriteController.removeFavorite);
router.get("/favorites", verifyToken, favoriteController.getAllFavorites);
router.get("/:id/blogs", verifyToken, blogController.getUserBlogs);

export default router;
