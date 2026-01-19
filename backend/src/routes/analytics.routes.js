const express = require('express');
const router = express.Router();
const analyticsService = require('../services/analytics.service');

/**
 * @route GET /api/analytics/skill-gaps
 * @desc Get skill gap analysis
 */
router.get('/skill-gaps', (req, res) => {
  try {
    const analysis = analyticsService.detectSkillGaps();
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route GET /api/analytics/trends
 * @desc Get workload trends over time
 */
router.get('/trends', (req, res) => {
  try {
    const trends = analyticsService.getWorkloadTrends();
    res.json(trends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route GET /api/analytics/departments
 * @desc Get department-wise analytics
 */
router.get('/departments', (req, res) => {
  try {
    const analytics = analyticsService.getDepartmentAnalytics();
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route GET /api/analytics/burnout-risk
 * @desc Get burnout risk analysis
 */
router.get('/burnout-risk', (req, res) => {
  try {
    const risks = analyticsService.getBurnoutRisk();
    res.json(risks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route GET /api/analytics/growth-opportunities
 * @desc Get growth opportunities for underutilized employees
 */
router.get('/growth-opportunities', (req, res) => {
  try {
    const opportunities = analyticsService.getGrowthOpportunities();
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route GET /api/analytics/future-forecast
 * @desc Get future workload forecast and bottleneck predictions
 */
router.get('/future-forecast', (req, res) => {
  try {
    const forecast = analyticsService.getFutureWorkloadForecast();
    res.json(forecast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
