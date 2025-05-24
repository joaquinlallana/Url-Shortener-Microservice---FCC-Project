const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true,
    trim: true
  },
  short_url: {
    type: Number,
    required: true,
    unique: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  clicks: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Url', urlSchema);
