import mongoose, { Document, Schema } from "mongoose";

const roleSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const roleModel = mongoose.model<IRole>("Role", roleSchema);

export default roleModel;

interface IRole extends Document {
  name: string;
}
