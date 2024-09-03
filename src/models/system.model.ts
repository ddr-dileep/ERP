import mongoose, { Document, Schema } from "mongoose";

const systemSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    assignmedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dateOfPurchase: { type: Date, required: true, default: new Date() },
    assignedHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastUpdated: { type: Date, default: Date.now },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    description: { type: String },
    model: { type: String },
    serialNumber: { type: String },
  },
  { timestamps: true }
);

const systemModels = mongoose.model<ISystemSchema>("System", systemSchema);
export default systemModels;

interface ISystemSchema extends Document {
  name: string;
  assignmedTo: string;
  dateOfPurchase: Date;
  assignedHistory: string[];
  lastUpdated: Date;
  status: "active" | "inactive";
  description: string;
  serialNumber: string;
}
