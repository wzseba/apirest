import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });

    //Generar jwt token enviar correo electronico para confirmar cuenta
    const { token, expiresIn } = generateToken(user._id);
    generateRefreshToken(user._id, res);

    return res.status(201).json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "El correo ya existe" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "El usuario no existe" });

    const checkPass = await user.comparePassword(password);
    if (!checkPass)
      return res.status(403).json({ error: "Password incorrecto" });

    // Generar jwt token
    const { token, expiresIn } = generateToken(user._id);
    generateRefreshToken(user._id, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "El correo ya existe" });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid);
    return res.json({ email: user.email, uid: user.id });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error de server" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};
