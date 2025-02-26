import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String, 
        required: true,
        minLength: 8,
    }
}, { collection: 'users' });

export default mongoose.model('User', userSchema);