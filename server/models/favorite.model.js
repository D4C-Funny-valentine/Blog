import mongoose, { Schema } from "mongoose";
import modalOptions from "./modal.options.js";

const FavoriteSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blogId: {
      type: String,
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
    description: Array,
  },
  modalOptions
);

const favoriteModel = mongoose.model("Favorite", FavoriteSchema);

export default favoriteModel;
