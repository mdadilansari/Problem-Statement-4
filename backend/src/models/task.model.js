/**
 * Task Model
 * Represents a task with complexity, urgency, and assignment information
 */
class Task {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.estimatedHours = data.estimatedHours || 0;
    this.complexity = data.complexity || 1; // 1-5 scale
    this.urgency = data.urgency || 1; // 1-3 scale
    this.requiredSkill = data.requiredSkill;
    this.assignedTo = data.assignedTo || null;
  }

  /**
   * Calculate task load using the prototype formula
   * taskLoad = estimatedHours * (1 + complexity * 0.2) * (1 + urgency * 0.1)
   * @returns {number} Calculated task load
   */
  calculateLoad() {
    return this.estimatedHours * 
           (1 + this.complexity * 0.2) * 
           (1 + this.urgency * 0.1);
  }

  /**
   * Get complexity label
   * @returns {string}
   */
  getComplexityLabel() {
    const labels = ['', 'Very Low', 'Low', 'Medium', 'High', 'Very High'];
    return labels[this.complexity] || 'Unknown';
  }

  /**
   * Get urgency label
   * @returns {string}
   */
  getUrgencyLabel() {
    const labels = ['', 'Low', 'Medium', 'High'];
    return labels[this.urgency] || 'Unknown';
  }

  /**
   * Assign task to an employee
   * @param {string} employeeId
   */
  assignTo(employeeId) {
    this.assignedTo = employeeId;
  }

  /**
   * Unassign task
   */
  unassign() {
    this.assignedTo = null;
  }
}

module.exports = Task;
