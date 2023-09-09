const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  Sangat: Number,
  Puas: Number,
  Standar: Number,
  Kurang: Number,
  Tidak: Number,
  Bulan: String,
  Saran: [
    {
      content: String,
    },
  ],
  Tahun: String,
});

module.exports = {
  mainModel: model("mains", postSchema),
};
