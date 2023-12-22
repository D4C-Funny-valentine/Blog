import mongoose, { Schema } from "mongoose";
import modalOptions from "./modal.options.js";

const BlogSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userInfo: {
      type: Object,
    },
    description: Array,
    commentSection: {
      type: Array,
      default: [],
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  modalOptions
);

const blogModel = mongoose.model("Blog", BlogSchema);

export default blogModel;
