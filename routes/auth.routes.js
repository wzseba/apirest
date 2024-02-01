import { Router } from "express";
import {
  infoUser,
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import { validatorRegister } from "../middlewares/validations.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

router.post("/register", validatorRegister, register);
router.post("/login", login);
router.get("/protected", requireToken, infoUser);
router.get("/refresh", refreshToken);
router.get("/logout", logout);

export default router;
