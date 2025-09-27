const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  youtubeLink: { type: String },
  leetcodeLink: { type: String },
  articleLink: { type: String },
  level: { type: String, enum: ['Easy', 'Medium', 'Tough'], default: 'Easy' },
  isCompleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Problem', problemSchema);
