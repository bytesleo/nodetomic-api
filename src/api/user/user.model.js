import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String
  },
  email: {
    type: String,
    lowercase: true
  },
  provider: String,
  name: String,
  photo: String,
  roles: {
    type: Array,
    default: ['user']
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

UserSchema.plugin(mongoosePaginate);

require('./user.methods').default(UserSchema);

export default mongoose.model('User', UserSchema);
