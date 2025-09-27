const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors());
// Routes
app.get('/', (req, res) => res.send('API Running'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/chapters', require('./routes/chapterRoutes'));
app.use('/api/problems', require('./routes/problemRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
