import mongoose, { Schema, model, models } from "mongoose";

const restaurantSchema = new mongoose.Schema({
  category: String,
  brandImg: String,
  name: String,
  star: String,
  reviewStatement: String,
  foodImg: String,
  location: String,
  menuImg: String,
  openingHours: String,
});

const Restaurant = models.Restaurant || model("Restaurant", restaurantSchema);

export default Restaurant;
