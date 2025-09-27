const express = require('express');
const router = express.Router();
const { createChapter, getChapters } = require('../controllers/chapterController');

router.post('/', createChapter);
router.get('/', getChapters);

module.exports = router;
