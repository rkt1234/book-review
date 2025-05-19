const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const authRoutes = require('./src/routes/authRoutes.js');

app.get("/", (req, res) => res.send("Book Review API is running"));
// app.use('/api', authRoutes);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
