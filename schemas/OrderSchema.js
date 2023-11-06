const mongoose = require("mongoose");
export const OrderSchema = new mongoose.Schema({
  order: {
    type: String,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
});