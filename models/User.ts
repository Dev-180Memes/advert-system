// models/User.ts

import mongoose, { Schema, Model, Document, } from 'mongoose';

interface IUser extends Document {
    email: string;
    username: string;
    password: string;
}

const userSchema: Schema<IUser> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
