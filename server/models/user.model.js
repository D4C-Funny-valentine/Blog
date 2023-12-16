import mongoose from "mongoose";
import modalOptions from "./modal.options.js";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  modalOptions
);

const userModal = mongoose.model("User", UserSchema);

export default userModal;
