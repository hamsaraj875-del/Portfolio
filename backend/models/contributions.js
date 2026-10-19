const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema({
  cacheType: {
    type: String,
    required: true,
    unique: true,
    default: "contributions",
  },

  date: {
    type: Date,
    default: Date.now,
  },

  contributions: [
    {
      name: { type: String, required: true },
      title: { type: String, required: true },
      details: { type: String, default: "" },
      date: { type: Date },
      languages: [{ type: String }],
      number: { type: Number, required: true },
      url: { type: String, required: true },
      merged: { type: Boolean, default: null },
    },
  ],
});

module.exports = mongoose.model("Contribution",contributionSchema);
