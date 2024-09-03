import mongoose, { Schema } from "mongoose";

const teamSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    developers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const teamModel = mongoose.model("Team", teamSchema);

export default teamModel;
