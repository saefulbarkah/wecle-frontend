import mongoose, { Schema, InferSchemaType } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
});

type userType = InferSchemaType<typeof userSchema>;

const User = mongoose.model<userType>('User', userSchema);

export default User;
