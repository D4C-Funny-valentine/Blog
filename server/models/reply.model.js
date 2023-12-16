import mongoose, { Schema } from "mongoose";

const ReplySchema = new mongoose.Schema(
  {
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    senders: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const replyModel = mongoose.model("Reply", ReplySchema);

export default replyModel;
