const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());



const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const searchRoutes = require('./routes/searchRoutes');
app.get("/", (req, res) => res.send("Book Review API is running"));
app.use('/api', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', reviewRoutes);
app.use('/api', searchRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:3001';

app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));

