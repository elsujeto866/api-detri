import User from "../models/user.model.js";
import bycrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";


export const register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const passwordHash = await bycrypt.hash(password, 10);

    const newUser = new User({ email, username, password: passwordHash });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({id: userSaved._id, username: userSaved.username, email: userSaved.email, createdAt: userSaved.createdAt, updatedAt: userSaved.updatedAt});
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email  });

    if(!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bycrypt.compare(password, userFound.password);

    if(!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({id: userFound._id, username: userFound.username, email: userFound.email, createdAt: userFound.createdAt, updatedAt: userFound.updatedAt});
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

export const logout = async (req, res) => {

  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userId = req.user.payload.id;

  try {
    const user = await User.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error getting user" });
  }
};