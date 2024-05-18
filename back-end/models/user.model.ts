import mongoose, {Document, Model, Schema} from "mongoose";
import bcrypt from "bcryptjs";

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
    name: string;
    email: string;
    passwordHash: string;  // Updated field name
    avatar: {
        public_id: string;
        url: string;
    };
    posts: Array<{ postId: mongoose.Schema.Types.ObjectId }>;
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: {
            validator: function (value: string) {
                return emailRegexPattern.test(value);
            },
            message: "Please enter a valid email",
        },
    },
    passwordHash: {  // Updated field name
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false,
    },
    avatar: {
        public_id: String,
        url: String,
    },
    posts: [
        {
            postId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post'
            }
        }
    ],
}, {timestamps: true});

// Hash the password before saving
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('passwordHash')) return next();  // Updated check
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);  // Updated hash assignment
    next();
});

// Compare the password
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.passwordHash);  // Updated comparison
};

const UserModel: Model<IUser> = mongoose.model("User", userSchema);

export default UserModel;
