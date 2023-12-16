import express from "express";
import { verifyToken } from "../middleware/token.validation.js";
import blogController from "../controllers/blog.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/latest", blogController.getLatestBlog);
router.get("/most-read", blogController.getMostReadBlogs);
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getSingleBlog);
router.post("/", verifyToken, blogController.createBlog);
router.put("/:id", verifyToken, blogController.updateBlog);
router.delete("/:id", verifyToken, blogController.deleteBlog);

export default router;
