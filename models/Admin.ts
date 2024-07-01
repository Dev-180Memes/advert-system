import mongoose, { Document, Schema, Model } from "mongoose";

interface IAdmin extends Document {
    email: string;
    username: string;
    password: string;
}

const AdminSchema: Schema<IAdmin> = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Admin: Model<IAdmin> = mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);

export default Admin;