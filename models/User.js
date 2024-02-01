import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  // if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    console.log(error);
    throw new Error("Falló el hash del password");
  }
});

userSchema.methods.comparePassword = async function (clientPassword) {
  return await bcrypt.compare(clientPassword, this.password);
};

export const User = model("user", userSchema);
