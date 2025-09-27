const Chapter = require('../models/Chapter');

// Create Chapter
exports.createChapter = async (req, res) => {
  const { name, description } = req.body;
  const chapter = await Chapter.create({ name, description });
  res.status(201).json(chapter);
};

// Get all Chapters
exports.getChapters = async (req, res) => {
  const chapters = await Chapter.find().populate('problems');
  res.json(chapters);
};
