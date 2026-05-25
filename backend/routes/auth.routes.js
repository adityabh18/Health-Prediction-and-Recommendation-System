import express from "express"
import { googleLogin, login, logout, registration, setRole } from "../controllers/auth.controllers.js";

const authRoutes=express.Router();

/**
 * @route POST /api/auth/register
 * @description register a new user
 * @access public
 */
authRoutes.post("/register",registration)

/**
 * @route POST /api/auth/login
 * @description login user with email password and role
 * @access Public
 */
authRoutes.post("/login",login)

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie
 * @access public
 */
authRoutes.get("/logout",logout)
/**
 * @route POST /api/auth/googlelogin
 * @description login/register using Google
 * @access Public
 */
authRoutes.post("/google-login", googleLogin);
/**
 * @route POST /api/auth/set-role
 * @description set role after google signup
 * @access Public
 */
authRoutes.post("/set-role", setRole);

export default authRoutes;