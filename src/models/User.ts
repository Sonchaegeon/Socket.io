import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required!'
    },
    email: {
        type: String,
        required: "Email is required!"
    },
    password: {
        type: String,
        required: "Password is required!"
    },
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);