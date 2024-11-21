require('dotenv').config();
const express = require('express');
const path = require('path');
const dogRoutes = require('./routes/dogRoutes');
const errorHandler = require('./middlewares/errorHandler');
const PORT = process.env.PORT || 5000
const app = express();
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');
const uploadPath = path.join(__dirname, 'uploads');
const { swaggerUi, swaggerSpec } = require('../swaggerConfig');
connectDB()
// Middleware
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/uploads', express.static(uploadPath));

// Routes
app.use('/api/dogs', dogRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Handling Middleware
app.use(errorHandler);
app.listen(PORT, () =>
{
    console.log(`Server is running on http://localhost:${ PORT }`);
});
module.exports = app;
