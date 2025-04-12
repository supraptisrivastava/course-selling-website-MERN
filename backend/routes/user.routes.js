import express from 'express';
import { login, logout, purchases, signup } from '../controllers/user.controllers.js';
import userMiddleware from '../middlewares/user.mid.js';
import { buyCourses } from '../controllers/course.controllers.js';
const router =express.Router();
router.post("/signup", signup);
router.post("/login", login);
// router.post("/logout", logout);
router.post("/logout", (req, res) => {
    console.log("Authorization Header:", req.headers.authorization);
    res.status(200).json({ message: "Logout successful" });
});
router.post("/buy/:courseId", userMiddleware, buyCourses); 
router.get("/purchase", userMiddleware,purchases);
export default router;
    