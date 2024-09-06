import mongoose, { Document, Schema } from "mongoose";

const dailyStatusSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    status: {
      type: String,
      enum: ["done", "in progress", "not started"],
      required: true,
    },
    details: { type: String, required: true },
    timeSpent: { type: Number },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    leads: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  },
  { timestamps: true }
);

const dailyStatusModal = mongoose.model<IDailyStatus>(
  "Daily-Status",
  dailyStatusSchema
);
export default dailyStatusModal;

interface IDailyStatus extends Document {
  user: string;
  date: string;
  status: string;
  details: string;
  timeSpent?: number;
  project: string[];
  leads: string;
}
