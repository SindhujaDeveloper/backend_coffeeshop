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

const GallerySchema = new mongoose.Schema({
  image: String,
  imageName: String
});

export const userList = mongoose.model("users", UserSchema);
export const galleryList = mongoose.model("galleries", GallerySchema);