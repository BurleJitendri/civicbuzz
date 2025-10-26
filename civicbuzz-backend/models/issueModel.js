import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    latitude: { type: Number },
longitude: { type: Number },
    imageURL: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending",
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    // ✅ NEW: link the issue to the user who reported it
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Issue = mongoose.model("Issue", issueSchema);
export default Issue;
