const Problem = require('../models/Problem');
const Chapter = require('../models/Chapter');
const User = require('../models/User');

// Create a problem and associate with chapter
exports.createProblem = async (req, res) => {
  const { title, youtubeLink, leetcodeLink, articleLink, level, chapterId } = req.body;
  try {
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    const problem = await Problem.create({ title, youtubeLink, leetcodeLink, articleLink, level });
    chapter.problems.push(problem._id);
    await chapter.save();

    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark problem as completed
exports.markCompleted = async (req, res) => {
  const { userId, problemId, isCompleted } = req.body;
  try {
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });

    problem.isCompleted = isCompleted;
    await problem.save();

    const user = await User.findById(userId);
    if (isCompleted) {
      if (!user.progress.includes(problemId)) {
        user.progress.push(problemId);
      }
    } else {
      user.progress = user.progress.filter(id => id.toString() !== problemId);
    }
    await user.save();
    res.json({ message: 'Problem updated', progress: user.progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all problems
exports.getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get progress by level
// exports.getProgress = async (req, res) => {
//   try {
//     const progress = await Problem.aggregate([
//       {
//         $group: {
//           _id: "$level",
//           total: { $sum: 1 },
//           completed: {
//             $sum: {
//               $cond: [{ $eq: ["$isCompleted", true] }, 1, 0]
//             }
//           }
//         }
//       }
//     ]);

//     // Default values
//     let result = { Easy: 0, Medium: 0, Tough: 0 };

//     progress.forEach(({ _id, total, completed }) => {
//       const percentage = total > 0 ? (completed / total) * 100 : 0;
//       result[_id] = parseFloat(percentage.toFixed(2));
//     });

//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


exports.getProgress = async (req, res) => {
  try {
    const progress = await Problem.aggregate([
      {
        $group: {
          _id: "$level", // <-- Group by level instead of level
          total: { $sum: 1 },
          completed: {
            $sum: {
              $cond: [{ $eq: ["$isCompleted", true] }, 1, 0]
            }
          }
        }
      }
    ]);

    // Default result with all labels
    let result = { Easy: 0, Medium: 0, Tough: 0 };
console.log("progress=======", progress)
    progress.forEach(({ _id, total, completed }) => {
      const percentage = total > 0 ? (completed / total) * 100 : 0;
      result[_id] = parseFloat(percentage.toFixed(2));
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
