import mongoose, { Schema } from "mongoose";

const skillSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const skillModel = mongoose.model<ISkill>("Skill", skillSchema);
export default skillModel;

interface ISkill extends Document {
  name: string;
}
