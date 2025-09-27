const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  problems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }]
});

module.exports = mongoose.model('Chapter', chapterSchema);
