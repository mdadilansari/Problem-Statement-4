const express = require('express');
const workloadService = require('../services/workload.service');
const recommendationService = require('../services/recommendation.service');

const router = express.Router();

/**
 * @route   GET /api/workload/summary
 * @desc    Get workload summary for all employees
 * @access  Public
 */
router.get('/summary', async (req, res) => {
  try {
    await workloadService.loadData();
    const summary = workloadService.getWorkloadSummary();
    res.json({ success: true, data: summary });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/workload/imbalances
 * @desc    Get workload imbalances (overloaded and underutilized employees)
 * @access  Public
 */
router.get('/imbalances', async (req, res) => {
  try {
    await workloadService.loadData();
    const imbalances = workloadService.detectImbalances();
    res.json({ success: true, data: imbalances });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/workload/recommendations
 * @desc    Get rebalancing recommendations
 * @access  Public
 */
router.get('/recommendations', async (req, res) => {
  try {
    await workloadService.loadData();
    const recommendations = recommendationService.generateRecommendations();
    res.json({ success: true, data: recommendations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/workload/tasks
 * @desc    Get all tasks with details
 * @access  Public
 */
router.get('/tasks', async (req, res) => {
  try {
    await workloadService.loadData();
    const tasks = workloadService.getTaskDetails();
    res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/workload/employee/:id
 * @desc    Get employee details with assigned tasks
 * @access  Public
 */
router.get('/employee/:id', async (req, res) => {
  try {
    await workloadService.loadData();
    const employee = workloadService.getEmployeeById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ success: false, error: 'Employee not found' });
    }

    const tasks = workloadService.getEmployeeTasks(req.params.id);
    
    res.json({
      success: true,
      data: {
        id: employee.id,
        name: employee.name,
        skills: employee.skills,
        capacityHours: employee.capacityHours,
        currentHours: parseFloat(employee.currentHours.toFixed(2)),
        utilization: parseFloat(employee.getUtilization().toFixed(2)),
        workloadState: employee.getWorkloadState(),
        tasks: tasks
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   POST /api/workload/simulate
 * @desc    Simulate task reassignment
 * @access  Public
 */
router.post('/simulate', async (req, res) => {
  try {
    await workloadService.loadData();
    const { taskId, fromEmployeeId, toEmployeeId } = req.body;

    if (!taskId || !fromEmployeeId || !toEmployeeId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: taskId, fromEmployeeId, toEmployeeId'
      });
    }

    const simulation = recommendationService.simulateReassignment(
      taskId,
      fromEmployeeId,
      toEmployeeId
    );

    if (!simulation.success) {
      return res.status(400).json(simulation);
    }

    res.json({ success: true, data: simulation });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/workload/stats
 * @desc    Get overall workload statistics
 * @access  Public
 */
router.get('/stats', async (req, res) => {
  try {
    await workloadService.loadData();
    const summary = workloadService.getWorkloadSummary();
    const imbalances = workloadService.detectImbalances();

    const stats = {
      totalEmployees: summary.length,
      totalTasks: workloadService.tasks.length,
      averageUtilization: parseFloat(
        (summary.reduce((sum, emp) => sum + emp.utilization, 0) / summary.length).toFixed(2)
      ),
      workloadDistribution: {
        critical: summary.filter(e => e.workloadState === 'Critical').length,
        overloaded: summary.filter(e => e.workloadState === 'Overloaded').length,
        optimal: summary.filter(e => e.workloadState === 'Optimal').length,
        underutilized: summary.filter(e => e.workloadState === 'Underutilized').length,
        available: summary.filter(e => e.workloadState === 'Available').length
      },
      imbalancesSummary: imbalances.summary
    };

    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
