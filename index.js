const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Book Review API is running"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
