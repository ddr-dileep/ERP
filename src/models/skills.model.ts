import mongoose, { Schema, Document } from "mongoose";

interface ISkill extends Document {
  name: string;
  createdBy: mongoose.Schema.Types.ObjectId;
}

const skillSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Create an index on the `name` field with case-insensitive
skillSchema.index(
  { name: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

const skillModel = mongoose.model<ISkill>("Skill", skillSchema);
export default skillModel;
