import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { validatorRegister } from "../middlewares/validations.js";

const router = express.Router();

router.post("/register", validatorRegister, register);
router.post("/login", login);

export default router;
