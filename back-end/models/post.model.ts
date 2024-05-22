import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, default: null },
    views: { type: Number, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, // Changed from catSlug and type String
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

export const Post = mongoose.model('Post', postSchema);
