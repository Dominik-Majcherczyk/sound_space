import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { check, body, validationResult } from "express-validator";
export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    // console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async ( req, res,  ) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(422).json({errors: errors.array()})
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
       return res.status(400).json({ error: "User already exist" });

    if (password !== confirmPassword)
      return res.status(400).json({ error: "Password dont match." });
    
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    return res.status(200).json({ result, token });
  } catch (error) {
    return  res.status(500).json({ message: "Something went wrong." });
  }
};
