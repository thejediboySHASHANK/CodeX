import mongoose, {Schema} from 'mongoose';

const categorySchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: null
    }
}, {timestamps: true});

categorySchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'category'
});

const CategoryModel = mongoose.model('Category', categorySchema);

export default CategoryModel;