import mongoose,{ Schema, Model, Document, ObjectId } from "mongoose";

interface IReport extends Document {
    campaignTitle: string;
    content: string;
    successfulEmails: string[];
    failedEmails: string[];
    createdBy: ObjectId;
    createdAt: Date;
}

const reportSchema: Schema<IReport> = new Schema({
    campaignTitle: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    successfulEmails: {
        type: [String],
        required: true,
    },
    failedEmails: {
        type: [String],
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Report: Model<IReport> = mongoose.models.Report || mongoose.model<IReport>('Report', reportSchema);

export default Report;