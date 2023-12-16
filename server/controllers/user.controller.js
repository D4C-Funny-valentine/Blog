import userModel from "../models/user.model.js";
import emailValidation from "../utils/emailValidation.js";
import { compareData, hashData } from "../utils/hash.compare.data.js";
import createToken from "../utils/createToken.js";

const signUp = async (req, res) => {
  try {
    const { username, email, password, passwordConfirmation } = req.body;
    if (!(username && email && password && passwordConfirmation)) {
      return res.status(400).json({
        message:
          "Username, email, password & passwordConfirmation are required",
      });
    }
    const isValidEmail = await emailValidation(email);

    if (!isValidEmail) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    if (password.length < 7) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    if (password !== passwordConfirmation) {
      return res
        .status(400)
        .json({ message: "Password and confirmation password do not match" });
    }

    const hashedPassword = await hashData(password);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      // create token
      const token = await createToken({ user });
      const { password, ...rest } = user._doc;
      return res.status(200).json({
        success: true,
        message: `User ${username} is register successfully`,
        user: { ...rest },
        token,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.keyValue?.email
        ? `This email is already taken`
        : `This name is already taken`,
    });

    console.log(error);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res
        .status(400)
        .json({ message: "Email & password must be provided" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "This email is not registered" });
    }
    const isCorrectPassword = await compareData(password, user.password);

    if (isCorrectPassword) {
      const token = await createToken({ user });
      const { password, ...rest } = user._doc;
      return res.status(200).json({
        success: true,
        message: `Welcome back ${user.username}.`,
        user: { ...rest },
        token,
      });
    } else {
      return res.status(400).json({ message: "Incorrect password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error(error);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword, confirmationNewPassword } = req.body;
    if (!(password && newPassword && confirmationNewPassword)) {
      return res.status(400).json({
        message: "Password, new password & confirmation password are required",
      });
    }

    const user = await userModel.findById(req.user.id).select("password id");

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Insufficient permissions" });
    }

    const isCurrentPasswordCorrect = await compareData(password, user.password);

    if (!isCurrentPasswordCorrect) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    if (newPassword < 7) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const hashedNewPassword = await hashData(newPassword);

    user.password = hashedNewPassword;

    await user.save();

    return res
      .status(201)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error(error);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...rest } = user._doc;
    return res.status(200).json({ success: true, user: { ...rest } });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error(error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { username, email, displayName, about, image } = req.body;
    if (!(username && email)) {
      return res
        .status(400)
        .json({ message: "Username and email must be provided" });
    }

    console.log(image);

    const isValidEmail = await emailValidation(email);

    if (isValidEmail) {
      user.username = username;
      user.email = email;
      user.displayName = displayName;
      user.about = about;
      user.image = image;

      await user.save();

      return res
        .status(201)
        .json({ success: true, user, message: "Update successfully" });
    } else {
      return res.status(400).json({ message: "Please put correct email" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error(error);
  }
};

const logout = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (user) {
      return res
        .status(200)
        .json({ success: true, message: "Logout successful" });
    } else {
      return res.status(404).json({ message: "Logout failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error(error);
  }
};

export default {
  signUp,
  signIn,
  updatePassword,
  updateProfile,
  getInfo,
  logout,
};
