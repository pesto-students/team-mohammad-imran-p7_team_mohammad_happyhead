import mongoose from 'mongoose';
// const bcrypt = require('bcrypt');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the UserToolsSchema
const UserToolsSchema = mongoose.Schema({
  type: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8],
    required: true,
  },
});

// Define the UserAnswersSchema
const UserAnswersSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: [Number],
    required: true,
    validate: {
      validator: function (value) {
        return value.length === 26;
      },
      message: 'Answers array must have exactly 26 numbers.',
    },
  },
  recommendations: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return value.length === 26;
      },
      message: 'Recommendations array must have exactly 26 strings.',
    },
  },
});

// Define the UsersSchema
const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  hash_password: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  toolsCompleted: [UserToolsSchema],
  answers: UserAnswersSchema,
});

 
// Create the Users model using the schema
const Users = mongoose.model('Users', UsersSchema);

export default Users;
