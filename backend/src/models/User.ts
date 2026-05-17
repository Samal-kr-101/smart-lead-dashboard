import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "sales";
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ["admin", "sales"], default: "sales" },
  },
  { timestamps: true }
);

// ===============================
// 🔥 PASSWORD HASH (NO next, NO TS ERROR)
// ===============================
userSchema.pre("save", async function () {
  const user = this as IUser;

  if (!user.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// ===============================
// 🔐 COMPARE PASSWORD
// ===============================
userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>("User", userSchema);