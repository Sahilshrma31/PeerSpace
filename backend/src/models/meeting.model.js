import mongoose, { Schema } from "mongoose";

const meetingSchema = new Schema(
    {
        // Stores the username rather than an ObjectId ref, kept for
        // compatibility with existing history documents.
        user_id: { type: String, index: true },
        meetingCode: { type: String, required: true },
        date: { type: Date, default: Date.now, required: true }
    }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

export { Meeting };
