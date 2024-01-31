import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) throw new Error("No existe el token en header");

    token = token.split(" ")[1];

    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;

    next();
  } catch (error) {
    const tokenVerificationErrors = {
      "invalid signature": "La firma de JWT no es valida",
      "jwt expired": "JWT expirado",
      "invalid token": "token no valido",
      "No Bearer": "Utiliza formato Bearer",
    };

    return res
      .status(401)
      .send({ error: tokenVerificationErrors[error.message] });
  }
};
