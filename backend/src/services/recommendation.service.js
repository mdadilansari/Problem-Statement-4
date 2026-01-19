const workloadService = require('./workload.service');

/**
 * Recommendation Service
 * Generates workload rebalancing recommendations
 */
class RecommendationService {
  /**
   * Generate rebalancing recommendations
   * @returns {Array} Recommended task movements
   */
  generateRecommendations() {
    const recommendations = [];
    const imbalances = workloadService.detectImbalances();

    // Get overloaded and available/underutilized employees
    const overloaded = imbalances.overloaded;
    const targets = [...imbalances.available, ...imbalances.underutilized];

    if (overloaded.length === 0 || targets.length === 0) {
      return {
        recommendations: [],
        message: 'No rebalancing needed - workload is well distributed',
        statistics: {
          overloadedEmployees: 0,
          availableEmployees: targets.length,
          potentialMoves: 0
        }
      };
    }

    // For each overloaded employee, find tasks that can be moved
    overloaded.forEach(source => {
      const sourceTasks = workloadService.getEmployeeTasks(source.id);

      sourceTasks.forEach(task => {
        // Find suitable target employees with matching skills
        const suitableTargets = targets.filter(target => 
          target.skills.includes(task.requiredSkill) &&
          target.id !== source.id
        );

        suitableTargets.forEach(target => {
          const sourceEmployee = workloadService.getEmployeeById(source.id);
          const targetEmployee = workloadService.getEmployeeById(target.id);

          // Calculate impact of moving this task
          const sourceNewLoad = sourceEmployee.currentHours - task.calculatedLoad;
          const targetNewLoad = targetEmployee.currentHours + task.calculatedLoad;

          const sourceNewUtilization = (sourceNewLoad / sourceEmployee.capacityHours) * 100;
          const targetNewUtilization = (targetNewLoad / targetEmployee.capacityHours) * 100;

          // Only recommend if it improves balance and doesn't overload target
          if (targetNewUtilization < 85 && sourceNewUtilization < source.utilization) {
            const improvement = source.utilization - sourceNewUtilization;

            recommendations.push({
              taskId: task.id,
              taskTitle: task.title,
              taskLoad: task.calculatedLoad,
              estimatedHours: task.estimatedHours,
              complexity: task.complexity,
              urgency: task.urgency,
              requiredSkill: task.requiredSkill,
              from: {
                id: source.id,
                name: source.name,
                currentUtilization: source.utilization,
                newUtilization: parseFloat(sourceNewUtilization.toFixed(2)),
                currentHours: source.currentHours,
                newHours: parseFloat(sourceNewLoad.toFixed(2))
              },
              to: {
                id: target.id,
                name: target.name,
                currentUtilization: target.utilization,
                newUtilization: parseFloat(targetNewUtilization.toFixed(2)),
                currentHours: target.currentHours,
                newHours: parseFloat(targetNewLoad.toFixed(2))
              },
              improvement: parseFloat(improvement.toFixed(2)),
              reasoning: this.generateReasoning(source, target, task, improvement),
              priority: this.calculatePriority(improvement, task.urgency, source.utilization)
            });
          }
        });
      });
    });

    // Sort recommendations by priority (highest first)
    recommendations.sort((a, b) => b.priority - a.priority);

    return {
      recommendations: recommendations.slice(0, 10), // Limit to top 10 recommendations
      statistics: {
        overloadedEmployees: overloaded.length,
        availableEmployees: targets.length,
        potentialMoves: recommendations.length,
        topRecommendations: Math.min(10, recommendations.length)
      },
      message: recommendations.length > 0 
        ? `Found ${recommendations.length} potential task movements to improve workload balance`
        : 'No suitable task movements found'
    };
  }

  /**
   * Generate human-readable reasoning for a recommendation
   * @param {Object} source - Source employee
   * @param {Object} target - Target employee
   * @param {Object} task - Task to move
   * @param {number} improvement - Utilization improvement percentage
   * @returns {string} Reasoning text
   */
  generateReasoning(source, target, task, improvement) {
    return `Move "${task.title}" from ${source.name} (${source.utilization.toFixed(1)}% utilized) ` +
           `to ${target.name} (${target.utilization.toFixed(1)}% utilized). ` +
           `Both have "${task.requiredSkill}" skill. ` +
           `Expected improvement: ${improvement.toFixed(1)}% reduction in ${source.name}'s workload.`;
  }

  /**
   * Calculate priority score for a recommendation
   * @param {number} improvement - Utilization improvement
   * @param {number} urgency - Task urgency (1-3)
   * @param {number} sourceUtilization - Source employee utilization
   * @returns {number} Priority score
   */
  calculatePriority(improvement, urgency, sourceUtilization) {
    // Priority formula: (improvement * 2) + (urgency * 10) + (sourceUtilization * 0.5)
    // Higher improvement, urgency, and source utilization = higher priority
    return (improvement * 2) + (urgency * 10) + (sourceUtilization * 0.5);
  }

  /**
   * Simulate what-if scenario for a task reassignment
   * @param {string} taskId - Task to move
   * @param {string} fromEmployeeId - Source employee
   * @param {string} toEmployeeId - Target employee
   * @returns {Object} Simulation results
   */
  simulateReassignment(taskId, fromEmployeeId, toEmployeeId) {
    const task = workloadService.getTaskById(taskId);
    const fromEmployee = workloadService.getEmployeeById(fromEmployeeId);
    const toEmployee = workloadService.getEmployeeById(toEmployeeId);

    if (!task || !fromEmployee || !toEmployee) {
      return { success: false, error: 'Invalid task or employee IDs' };
    }

    // Check if target has required skill
    if (!toEmployee.hasSkill(task.requiredSkill)) {
      return {
        success: false,
        error: `${toEmployee.name} does not have the required skill: ${task.requiredSkill}`
      };
    }

    const taskLoad = task.calculateLoad();

    return {
      success: true,
      task: {
        id: task.id,
        title: task.title,
        load: parseFloat(taskLoad.toFixed(2))
      },
      from: {
        id: fromEmployee.id,
        name: fromEmployee.name,
        currentUtilization: parseFloat(fromEmployee.getUtilization().toFixed(2)),
        newUtilization: parseFloat(((fromEmployee.currentHours - taskLoad) / fromEmployee.capacityHours * 100).toFixed(2)),
        currentHours: parseFloat(fromEmployee.currentHours.toFixed(2)),
        newHours: parseFloat((fromEmployee.currentHours - taskLoad).toFixed(2))
      },
      to: {
        id: toEmployee.id,
        name: toEmployee.name,
        currentUtilization: parseFloat(toEmployee.getUtilization().toFixed(2)),
        newUtilization: parseFloat(((toEmployee.currentHours + taskLoad) / toEmployee.capacityHours * 100).toFixed(2)),
        currentHours: parseFloat(toEmployee.currentHours.toFixed(2)),
        newHours: parseFloat((toEmployee.currentHours + taskLoad).toFixed(2))
      }
    };
  }
}

module.exports = new RecommendationService();
