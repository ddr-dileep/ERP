import mongoose, { Document, Schema } from "mongoose";

const userSchema: Schema = new Schema(
  {
    nickname: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
    system: [{ type: mongoose.Schema.Types.ObjectId, ref: "System" }],
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    experience: { type: String },
    lastCompany: { type: String },
    lastPosition: { type: String },
    lastJobDescription: { type: String },
    position: { type: String },
    mobile: [{ type: String }],
    address: { type: String },
    hobbies: [{ type: String }],
    languages: [{ type: String }],
    education: [{ type: String }],
    certificates: [{ type: String }],
    currentProject: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    dataOfBirth: { type: Date },
    photo: { type: String },
    linkedin: { type: String },
    github: { type: String },
    contractTime: { type: String },
    lead: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
    teamLead: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    isAccountActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const userModel = mongoose.model<IUser>("User", userSchema);

export default userModel;

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  system: string[];
  skills: string[];
  experience: string;
  lastCompany: string;
  lastPosition: string;
  lastJobDescription: string;
  position: string;
  mobile: string[];
  address: string;
  hobbies: string[];
  languages: string[];
  education: string[];
  certificates: string[];
  projects: string[];
  createdAt: Date;
  updatedAt: Date;
  currentProject: string;
  dataOfBirth: Date;
  photo: string;
  linkedin: string;
  github: string;
  contractTime: string;
  lead: string[];
  team: string[];
  teamLead: string;
  company: string;
}
