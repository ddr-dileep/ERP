import mongoose, { Schema, Document } from "mongoose";

interface IProject extends Document {
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  assignedTo: mongoose.Schema.Types.ObjectId[];
  team: mongoose.Schema.Types.ObjectId;
  tasks: mongoose.Schema.Types.ObjectId[];
  status: "active" | "inactive";
  client?: string;
  system: mongoose.Schema.Types.ObjectId[];
  role?: string;
}

// Schema
const projectSchema: Schema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    assignedTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
    team: { type: Schema.Types.ObjectId, ref: "Team" },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    client: { type: String },
    system: [{ type: Schema.Types.ObjectId, ref: "System" }],
    role: { type: String },
  },
  { timestamps: true }
);

const projectModel = mongoose.model<IProject>("Project", projectSchema);
export default projectModel;
