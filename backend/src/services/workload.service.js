const fs = require('fs').promises;
const path = require('path');
const Employee = require('../models/employee.model');
const Task = require('../models/task.model');

/**
 * Workload Service
 * Handles workload calculation, imbalance detection, and analysis
 */
class WorkloadService {
  constructor() {
    this.employees = [];
    this.tasks = [];
  }

  /**
   * Load mock data from JSON files
   */
  async loadData() {
    try {
      const employeesPath = path.join(__dirname, '../data/employees.json');
      const tasksPath = path.join(__dirname, '../data/tasks.json');

      const employeesData = await fs.readFile(employeesPath, 'utf-8');
      const tasksData = await fs.readFile(tasksPath, 'utf-8');

      this.employees = JSON.parse(employeesData).map(e => new Employee(e));
      this.tasks = JSON.parse(tasksData).map(t => new Task(t));

      // Calculate current workload for each employee
      this.calculateWorkloads();

      return { success: true };
    } catch (error) {
      console.error('Error loading data:', error);
      throw new Error('Failed to load data');
    }
  }

  /**
   * Calculate workload for all employees based on assigned tasks
   */
  calculateWorkloads() {
    // Reset all employee workloads
    this.employees.forEach(emp => emp.currentHours = 0);

    // Calculate task loads and assign to employees
    this.tasks.forEach(task => {
      if (task.assignedTo) {
        const employee = this.employees.find(e => e.id === task.assignedTo);
        if (employee) {
          const taskLoad = task.calculateLoad();
          employee.addWorkload(taskLoad);
        }
      }
    });
  }

  /**
   * Get workload summary for all employees
   * @returns {Array} Employee workload summaries
   */
  getWorkloadSummary() {
    return this.employees.map(emp => ({
      id: emp.id,
      name: emp.name,
      skills: emp.skills,
      capacityHours: emp.capacityHours,
      currentHours: parseFloat(emp.currentHours.toFixed(2)),
      utilization: parseFloat(emp.getUtilization().toFixed(2)),
      workloadState: emp.getWorkloadState(),
      assignedTasks: this.tasks.filter(t => t.assignedTo === emp.id).length
    }));
  }

  /**
   * Detect workload imbalances
   * @returns {Object} Overloaded and underutilized employees
   */
  detectImbalances() {
    const overloaded = [];
    const underutilized = [];
    const available = [];

    this.employees.forEach(emp => {
      const utilization = emp.getUtilization();
      const workloadState = emp.getWorkloadState();
      const summary = {
        id: emp.id,
        name: emp.name,
        utilization: parseFloat(utilization.toFixed(2)),
        currentHours: parseFloat(emp.currentHours.toFixed(2)),
        capacityHours: emp.capacityHours,
        workloadState: workloadState,
        skills: emp.skills
      };

      // Include both Critical (>95%) and Overloaded (85-95%) in overloaded array
      if (workloadState === 'Critical' || workloadState === 'Overloaded') {
        overloaded.push(summary);
      } else if (workloadState === 'Underutilized' || workloadState === 'Available') {
        if (workloadState === 'Available') {
          available.push(summary);
        } else {
          underutilized.push(summary);
        }
      }
    });

    return {
      overloaded: overloaded.sort((a, b) => b.utilization - a.utilization),
      underutilized: underutilized.sort((a, b) => a.utilization - b.utilization),
      available: available.sort((a, b) => a.utilization - b.utilization),
      summary: {
        totalEmployees: this.employees.length,
        overloadedCount: overloaded.length,
        underutilizedCount: underutilized.length,
        availableCount: available.length
      }
    };
  }

  /**
   * Get detailed task information
   * @returns {Array} Task details with calculated loads
   */
  getTaskDetails() {
    return this.tasks.map(task => ({
      id: task.id,
      title: task.title,
      estimatedHours: task.estimatedHours,
      complexity: task.complexity,
      complexityLabel: task.getComplexityLabel(),
      urgency: task.urgency,
      urgencyLabel: task.getUrgencyLabel(),
      requiredSkill: task.requiredSkill,
      assignedTo: task.assignedTo,
      assignedToName: task.assignedTo 
        ? this.employees.find(e => e.id === task.assignedTo)?.name 
        : null,
      calculatedLoad: parseFloat(task.calculateLoad().toFixed(2))
    }));
  }

  /**
   * Get employee by ID
   * @param {string} employeeId
   * @returns {Employee|null}
   */
  getEmployeeById(employeeId) {
    return this.employees.find(e => e.id === employeeId) || null;
  }

  /**
   * Get task by ID
   * @param {string} taskId
   * @returns {Task|null}
   */
  getTaskById(taskId) {
    return this.tasks.find(t => t.id === taskId) || null;
  }

  /**
   * Get tasks assigned to an employee
   * @param {string} employeeId
   * @returns {Array} Tasks assigned to the employee
   */
  getEmployeeTasks(employeeId) {
    return this.tasks
      .filter(t => t.assignedTo === employeeId)
      .map(task => ({
        id: task.id,
        title: task.title,
        estimatedHours: task.estimatedHours,
        complexity: task.complexity,
        urgency: task.urgency,
        requiredSkill: task.requiredSkill,
        calculatedLoad: parseFloat(task.calculateLoad().toFixed(2))
      }));
  }
}

module.exports = new WorkloadService();
