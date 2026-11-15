const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDatabase } = require('../database/db');

// Import route modules for all 6 team members
const adminRoutes = require('./routes/admin.routes');
const petEhrRoutes = require('./routes/pet_ehr.routes');
const appointmentRoutes = require('./routes/appointments.routes');
const inventoryRoutes = require('./routes/inventory.routes');
const operationsRoutes = require('./routes/operations.routes');
const groomingRoutes = require('./routes/grooming.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Core Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets
app.use(express.static(path.join(__dirname, '..', 'public')));

// Mount API Routes
app.use('/api/admin', adminRoutes);
app.use('/api', petEhrRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/operations', operationsRoutes);
app.use('/api/grooming', groomingRoutes);

// Dedicated Hospital Management Dashboard Route
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'dashboard.html'));
});

// Catch-all route serves SPA
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Initialize database and start HTTP server
const startServer = async () => {
    await initDatabase();
    app.listen(PORT, () => {
        console.log('===============================================================');
        console.log(`🐾 PawLife Web Application running at: http://localhost:${PORT}`);
        console.log('PawLife Pet Care Management System');
        console.log('Developed by Sanvidu Nethula');
        console.log('===============================================================');
    });
};

startServer();
