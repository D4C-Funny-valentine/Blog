import express from "express";
import userRoute from "./user.routes.js";
import blogRoute from "./blog.routes.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/blogs", blogRoute);

export default router;
