import mongoose, { Schema } from "mongoose";

const userScheme = new Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true }
        // No `token` field: auth is stateless JWT, so sessions are not stored.
    },
    { timestamps: true }
);

const User = mongoose.model("User", userScheme);

export { User };
