import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    desc: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Using only ObjectId reference
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
});

export const Comment = mongoose.model('Comment', commentSchema);
