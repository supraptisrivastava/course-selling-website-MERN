import express from 'express';
import { login, logout, signup } from '../controllers/admin.controllers.js';


const router =express.Router();
router.post("/signup", signup);
router.post("/login", login);
// router.post("/logout", logout);
router.post("/logout", (req, res) => {
  res.clearCookie("token"); // If using cookies
  res.status(200).json({ message: "Logged out successfully" });
});


export default router;
    