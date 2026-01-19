const express = require('express');
const cors = require('cors');
const workloadRoutes = require('./routes/workload.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/workload', workloadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Workload Optimization API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AI-Powered Workload Optimization Platform API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      summary: '/api/workload/summary',
      imbalances: '/api/workload/imbalances',
      recommendations: '/api/workload/recommendations',
      tasks: '/api/workload/tasks',
      employee: '/api/workload/employee/:id',
      simulate: '/api/workload/simulate (POST)',
      stats: '/api/workload/stats'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/`);
});

module.exports = app;
