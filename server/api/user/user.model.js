// Libs
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Model
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true
    },
    provider: String,
    name: String,
    photo: String,
    role: {
        type: String,
        default: 'user'
    },
    status: {
        type: Number,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now
    },
    last_login: {
        type: Date
    },
    social: {
        id: String,
        info: {}
    }
});

require('./user.methods').default(UserSchema);

export default mongoose.model('User', UserSchema);
