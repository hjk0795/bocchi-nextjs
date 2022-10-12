import mongoose, { Schema, model, models } from "mongoose";

const restaurantSchema = new mongoose.Schema({
  category: String,
  brandImg: String,
  name: String,
  foodImg: String,
  location: String,
  menuImg: String,
  openingHours: String,
  review: [{
    star: String,
    statement: String,
  }],
});

const Restaurant = models.Restaurant || model("Restaurant", restaurantSchema);

export default Restaurant;
