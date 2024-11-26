
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['support', 'admin', 'superadmin', 'Support', 'Admin', 'Superadmin'],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active:{
        type: Boolean,
        require: true
    }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
