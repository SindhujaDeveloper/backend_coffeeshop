import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI  || 'mongodb://localhost:27017/coffeeShop');

const UserSchema = new mongoose.Schema({
  Firstname: String,
  Lastname: String,
  City: String,
  Gender: String,
  Birthdate: String,
  Mobileno: Number,
});

export const userList = mongoose.model("users", UserSchema);