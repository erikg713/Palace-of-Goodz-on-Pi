const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Security & Middleware
app.use(helmet()); // Protects against common web vulnerabilities
app.use(cors()); // Allows your React frontend to talk to this server
app.use(express.json()); // Parses incoming JSON Goodz data
app.use('/uploads', express.static('uploads')); // Serves product images

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Palace Server running on port ${PORT}`));
