import mongoose, { Schema } from "mongoose";

const projectSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
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

interface IProject extends Document {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  assignedTo: string;
  team: string;
  tasks: string[];
  status: "active" | "inactive";
  client: string;
  system: string[];
  role: string;
}
