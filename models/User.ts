import mongoose, { Schema, Model, Document, ObjectId } from 'mongoose';

interface IUser extends Document {
    email: string;
    name: string;
    clientTo: ObjectId;
}

const userSchema: Schema<IUser> = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    clientTo: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
    },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
