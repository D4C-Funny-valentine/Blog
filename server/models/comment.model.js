import mongoose, { Schema } from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    blogId: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reply: Array,
  },
  { timestamps: true }
);

const commentModel = mongoose.model("Comment", CommentSchema);

export default commentModel;
