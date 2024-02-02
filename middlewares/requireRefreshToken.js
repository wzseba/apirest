import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/tokenMessageErrors.js";

export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) throw new Error("invalid token");

    const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);

    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: tokenVerificationErrors[error.message] });
  }
};
