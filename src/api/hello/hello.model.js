import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;

/**
 * @swagger
 * definition:
 *   Hello:
 *     properties:
 *       greet:
 *         type: string
 *       language:
 *         type: string
 */

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
