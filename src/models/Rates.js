import mongoose from "mongoose";

const RateSchema = new mongoose.Schema({
  SERVICES: {
    type: String,
    required: true
  },
  "OLD FLOOR FIXED (COST/SQFT)": {
    type: String,
    required: true
  },
  "NEW FLOOR FIXED (COST/SQFT)": {
    type: String,
    required: true
  },
  "MIN AREA (SQ.FT)": {
    type: String,
    required: true
  },
  "FLOOR-TYPE & DESCRIPTION": {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Rate", RateSchema);
