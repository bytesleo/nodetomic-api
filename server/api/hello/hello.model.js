import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;

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

HelloSchema.plugin(mongoosePaginate);

export default mongoose.model('Hello', HelloSchema);
