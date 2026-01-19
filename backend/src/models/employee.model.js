/**
 * Employee Model
 * Represents an employee with skills and capacity information
 */
class Employee {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.skills = data.skills || [];
    this.capacityHours = data.capacityHours || 40;
    this.currentHours = data.currentHours || 0;
  }

  /**
   * Calculate utilization percentage
   * @returns {number} Utilization percentage
   */
  getUtilization() {
    return this.capacityHours > 0 
      ? (this.currentHours / this.capacityHours) * 100 
      : 0;
  }

  /**
   * Get workload state based on utilization
   * @returns {string} Workload state
   */
  getWorkloadState() {
    const utilization = this.getUtilization();
    if (utilization > 95) return 'Critical';
    if (utilization >= 85) return 'Overloaded';
    if (utilization >= 70) return 'Optimal';
    if (utilization >= 50) return 'Underutilized';
    return 'Available';
  }

  /**
   * Check if employee has a specific skill
   * @param {string} skill - Skill to check
   * @returns {boolean}
   */
  hasSkill(skill) {
    return this.skills.includes(skill);
  }

  /**
   * Add workload hours
   * @param {number} hours - Hours to add
   */
  addWorkload(hours) {
    this.currentHours += hours;
  }

  /**
   * Remove workload hours
   * @param {number} hours - Hours to remove
   */
  removeWorkload(hours) {
    this.currentHours = Math.max(0, this.currentHours - hours);
  }
}

module.exports = Employee;
