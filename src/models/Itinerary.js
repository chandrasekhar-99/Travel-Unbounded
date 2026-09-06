import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema(
  {
    itinerary: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Itinerary =
  mongoose.models.Itinerary ||
  mongoose.model("Itinerary", itinerarySchema);

export default Itinerary;
