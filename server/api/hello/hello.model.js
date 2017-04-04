// Libs
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Model
const HelloSchema = new Schema({
    greet: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    }
});

export default mongoose.model('Hello', HelloSchema);
