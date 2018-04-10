import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;

const ExampleSchema = new Schema({
  greet: {
    type: String,
    required: [true, 'Greet is required.']
  },
  language: {
    type: String,
    required: [true, 'Language is required.']
  }
});

ExampleSchema.plugin(mongoosePaginate);

export default mongoose.model('Example', ExampleSchema);