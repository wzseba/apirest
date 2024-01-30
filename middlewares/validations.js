import { check } from "express-validator";
import { validateResult } from "../helpers/validateResultHelper.js";

export const validatorRegister = [
  check("email", "Email no valido")
    .trim()
    .escape()
    .normalizeEmail()
    .isEmail()
    .toLowerCase(),
  check("password", "Password incorrecto")
    .trim()
    .escape()
    .notEmpty()
    .isAlphanumeric()
    .isLength({ min: 6, max: 10 }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
