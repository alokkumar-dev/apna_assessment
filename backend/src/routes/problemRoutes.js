const express = require('express');
const router = express.Router();
const { createProblem, markCompleted , getAllProblems, getProgress } = require('../controllers/problemController');

router.post('/', createProblem);
router.put('/completed', markCompleted);

router.get('/', getAllProblems);
router.get('/progress', getProgress);

module.exports = router;
