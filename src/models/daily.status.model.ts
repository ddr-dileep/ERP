import mongoose, { Document, Schema } from "mongoose";

const dailyStatusSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, required: true },
    details: { type: String },
    timeSpent: { type: Number },
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    leads: { type: Schema.Types.ObjectId, ref: "User", required: true },
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
  date: Date;
  status: string;
  details: string;
  timeSpent: number;
  project: string;
  leads: string;
}
