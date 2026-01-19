const workloadService = require('./workload.service');

/**
 * Analytics Service
 * Provides skill gap detection, trend analysis, and advanced analytics
 */
class AnalyticsService {
  /**
   * Detect skill gaps in the organization
   * @returns {Object} Skill gap analysis
   */
  detectSkillGaps() {
    const allTasks = workloadService.tasks;
    const allEmployees = workloadService.employees;

    // Get all required skills from tasks
    const requiredSkills = {};
    allTasks.forEach(task => {
      if (!requiredSkills[task.requiredSkill]) {
        requiredSkills[task.requiredSkill] = {
          skill: task.requiredSkill,
          demandCount: 0,
          totalHours: 0,
          unassignedTasks: 0
        };
      }
      requiredSkills[task.requiredSkill].demandCount++;
      requiredSkills[task.requiredSkill].totalHours += task.estimatedHours;
      if (!task.assignedTo) {
        requiredSkills[task.requiredSkill].unassignedTasks++;
      }
    });

    // Get all available skills from employees
    const availableSkills = {};
    allEmployees.forEach(emp => {
      emp.skills.forEach(skill => {
        if (!availableSkills[skill]) {
          availableSkills[skill] = {
            skill: skill,
            employeeCount: 0,
            employees: [],
            totalCapacity: 0
          };
        }
        availableSkills[skill].employeeCount++;
        availableSkills[skill].employees.push({
          id: emp.id,
          name: emp.name,
          utilization: parseFloat(emp.getUtilization().toFixed(2))
        });
        availableSkills[skill].totalCapacity += emp.capacityHours;
      });
    });

    // Identify gaps
    const gaps = [];
    const surpluses = [];
    const balanced = [];

    Object.keys(requiredSkills).forEach(skill => {
      const demand = requiredSkills[skill];
      const supply = availableSkills[skill] || { employeeCount: 0, totalCapacity: 0, employees: [] };

      const gap = {
        skill: skill,
        demand: demand.demandCount,
        supply: supply.employeeCount,
        demandHours: demand.totalHours,
        supplyCapacity: supply.totalCapacity,
        unassignedTasks: demand.unassignedTasks,
        employees: supply.employees,
        status: '',
        severity: '',
        recommendation: ''
      };

      if (supply.employeeCount === 0) {
        gap.status = 'Critical Gap';
        gap.severity = 'high';
        gap.recommendation = `Urgent: No employees with ${skill} skill. Consider hiring or training.`;
        gaps.push(gap);
      } else if (supply.employeeCount < demand.demandCount / 2) {
        gap.status = 'Skill Gap';
        gap.severity = 'medium';
        gap.recommendation = `${skill} is in high demand but low supply. Consider training more team members.`;
        gaps.push(gap);
      } else if (supply.employeeCount > demand.demandCount * 2) {
        gap.status = 'Skill Surplus';
        gap.severity = 'low';
        gap.recommendation = `${skill} has more supply than demand. These team members could learn additional skills.`;
        surpluses.push(gap);
      } else {
        gap.status = 'Balanced';
        gap.severity = 'none';
        gap.recommendation = `${skill} supply and demand are well balanced.`;
        balanced.push(gap);
      }
    });

    // Identify skills with no demand
    Object.keys(availableSkills).forEach(skill => {
      if (!requiredSkills[skill]) {
        surpluses.push({
          skill: skill,
          demand: 0,
          supply: availableSkills[skill].employeeCount,
          demandHours: 0,
          supplyCapacity: availableSkills[skill].totalCapacity,
          unassignedTasks: 0,
          employees: availableSkills[skill].employees,
          status: 'No Demand',
          severity: 'low',
          recommendation: `${skill} is available but not currently needed in any tasks.`
        });
      }
    });

    return {
      summary: {
        totalSkillsRequired: Object.keys(requiredSkills).length,
        totalSkillsAvailable: Object.keys(availableSkills).length,
        criticalGaps: gaps.filter(g => g.severity === 'high').length,
        moderateGaps: gaps.filter(g => g.severity === 'medium').length,
        balanced: balanced.length,
        surpluses: surpluses.length
      },
      gaps: gaps.sort((a, b) => {
        const severityOrder = { high: 3, medium: 2, low: 1 };
        return (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0);
      }),
      balanced: balanced,
      surpluses: surpluses
    };
  }

  /**
   * Get workload trends (simulated time-series data)
   * @returns {Object} Trend data
   */
  getWorkloadTrends() {
    const employees = workloadService.employees;
    
    // Simulate historical data for the last 30 days
    const days = 30;
    const trends = [];

    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      // Simulate varying workload with some randomness
      const avgUtilization = employees.reduce((sum, emp) => sum + emp.getUtilization(), 0) / employees.length;
      
      // Add some variance to create a trend
      const variance = (Math.random() - 0.5) * 20; // +/- 10%
      const baseUtilization = Math.max(30, Math.min(95, avgUtilization + variance - (i * 0.5))); // Trending up

      trends.push({
        date: dateStr,
        averageUtilization: parseFloat(baseUtilization.toFixed(2)),
        overloadedCount: Math.floor(employees.length * (baseUtilization > 85 ? 0.3 : 0.1)),
        optimalCount: Math.floor(employees.length * 0.4),
        underutilizedCount: Math.floor(employees.length * 0.3),
        totalTasks: workloadService.tasks.length + Math.floor(Math.random() * 5 - 2)
      });
    }

    return {
      trends: trends,
      summary: {
        currentUtilization: parseFloat((employees.reduce((sum, emp) => sum + emp.getUtilization(), 0) / employees.length).toFixed(2)),
        trend: 'increasing',
        projectedUtilization: parseFloat((trends[trends.length - 1].averageUtilization + 5).toFixed(2)),
        daysAnalyzed: days + 1
      }
    };
  }

  /**
   * Get department-wise analytics
   * @returns {Object} Department analytics
   */
  getDepartmentAnalytics() {
    const employees = workloadService.employees;
    const departments = {};

    employees.forEach(emp => {
      const dept = emp.department || 'Unassigned';
      if (!departments[dept]) {
        departments[dept] = {
          name: dept,
          employeeCount: 0,
          totalCapacity: 0,
          totalWorkload: 0,
          employees: [],
          averageUtilization: 0,
          skills: new Set()
        };
      }

      departments[dept].employeeCount++;
      departments[dept].totalCapacity += emp.capacityHours;
      departments[dept].totalWorkload += emp.currentHours;
      departments[dept].employees.push({
        id: emp.id,
        name: emp.name,
        utilization: parseFloat(emp.getUtilization().toFixed(2))
      });
      emp.skills.forEach(skill => departments[dept].skills.add(skill));
    });

    // Calculate averages and convert to array
    const deptArray = Object.values(departments).map(dept => ({
      ...dept,
      skills: Array.from(dept.skills),
      averageUtilization: parseFloat((dept.totalWorkload / dept.totalCapacity * 100).toFixed(2)),
      workloadState: this.getDepartmentWorkloadState(dept.totalWorkload / dept.totalCapacity * 100)
    }));

    return {
      departments: deptArray.sort((a, b) => b.averageUtilization - a.averageUtilization),
      summary: {
        totalDepartments: deptArray.length,
        mostUtilized: deptArray[0],
        leastUtilized: deptArray[deptArray.length - 1]
      }
    };
  }

  /**
   * Get workload state for department
   * @param {number} utilization
   * @returns {string}
   */
  getDepartmentWorkloadState(utilization) {
    if (utilization > 95) return 'Critical';
    if (utilization >= 85) return 'Overloaded';
    if (utilization >= 70) return 'Optimal';
    if (utilization >= 50) return 'Underutilized';
    return 'Available';
  }

  /**
   * Get burnout risk analysis
   * @returns {Object} Burnout risk data
   */
  getBurnoutRisk() {
    const employees = workloadService.employees;
    const risks = [];

    employees.forEach(emp => {
      const utilization = emp.getUtilization();
      const tasks = workloadService.getEmployeeTasks(emp.id);
      
      // Calculate risk factors
      let riskScore = 0;
      let riskFactors = [];

      // High utilization
      if (utilization > 95) {
        riskScore += 40;
        riskFactors.push('Critical utilization (>95%)');
      } else if (utilization > 85) {
        riskScore += 25;
        riskFactors.push('High utilization (>85%)');
      }

      // Too many tasks
      if (tasks.length > 5) {
        riskScore += 20;
        riskFactors.push(`Managing ${tasks.length} tasks`);
      }

      // High complexity tasks
      const avgComplexity = tasks.reduce((sum, t) => sum + t.complexity, 0) / tasks.length;
      if (avgComplexity >= 4) {
        riskScore += 15;
        riskFactors.push('High task complexity');
      }

      // Urgent tasks
      const urgentTasks = tasks.filter(t => t.urgency === 3).length;
      if (urgentTasks > 2) {
        riskScore += 15;
        riskFactors.push(`${urgentTasks} urgent tasks`);
      }

      let riskLevel = 'Low';
      if (riskScore >= 60) riskLevel = 'High';
      else if (riskScore >= 30) riskLevel = 'Medium';

      if (riskScore > 0) {
        risks.push({
          employeeId: emp.id,
          employeeName: emp.name,
          riskScore: riskScore,
          riskLevel: riskLevel,
          utilization: parseFloat(utilization.toFixed(2)),
          taskCount: tasks.length,
          riskFactors: riskFactors,
          recommendation: this.getBurnoutRecommendation(riskLevel, emp)
        });
      }
    });

    return {
      atRisk: risks.filter(r => r.riskLevel !== 'Low').sort((a, b) => b.riskScore - a.riskScore),
      all: risks.sort((a, b) => b.riskScore - a.riskScore),
      summary: {
        highRisk: risks.filter(r => r.riskLevel === 'High').length,
        mediumRisk: risks.filter(r => r.riskLevel === 'Medium').length,
        lowRisk: risks.filter(r => r.riskLevel === 'Low').length
      }
    };
  }

  /**
   * Get burnout recommendation
   * @param {string} riskLevel
   * @param {Object} employee
   * @returns {string}
   */
  getBurnoutRecommendation(riskLevel, employee) {
    if (riskLevel === 'High') {
      return `Immediate action needed: Redistribute tasks from ${employee.name}. Consider additional support or deadline extensions.`;
    } else if (riskLevel === 'Medium') {
      return `Monitor closely: ${employee.name} is approaching high workload. Review task priorities and consider rebalancing.`;
    }
    return `${employee.name} has manageable workload. Continue monitoring.`;
  }

  /**
   * Get growth opportunities for underutilized employees
   * @returns {Object} Growth opportunities analysis
   */
  getGrowthOpportunities() {
    const employees = workloadService.employees;
    const tasks = workloadService.tasks;
    const opportunities = [];

    employees.forEach(emp => {
      const utilization = emp.getUtilization();
      const currentTasks = workloadService.getEmployeeTasks(emp.id);

      // Focus on underutilized employees (<70% utilization)
      if (utilization < 70) {
        const availableCapacity = emp.capacityHours - emp.currentHours;
        
        // Find unassigned tasks matching their skills
        const matchingTasks = tasks.filter(task => 
          !task.assignedTo && emp.hasSkill(task.requiredSkill)
        ).map(task => ({
          id: task.id,
          title: task.title,
          requiredSkill: task.requiredSkill,
          estimatedHours: task.estimatedHours,
          complexity: task.complexity,
          urgency: task.urgency,
          isStretchAssignment: task.complexity >= 4
        }));

        // Find skills they could learn (skills in demand but employee doesn't have)
        const skillsToLearn = [];
        const allRequiredSkills = new Set(tasks.map(t => t.requiredSkill));
        
        allRequiredSkills.forEach(skill => {
          if (!emp.hasSkill(skill)) {
            const demandCount = tasks.filter(t => t.requiredSkill === skill).length;
            const unassignedCount = tasks.filter(t => t.requiredSkill === skill && !t.assignedTo).length;
            
            if (demandCount > 0) {
              skillsToLearn.push({
                skill: skill,
                demand: demandCount,
                unassigned: unassignedCount,
                reason: unassignedCount > 0 
                  ? `${unassignedCount} unassigned ${skill} tasks available`
                  : `${demandCount} ${skill} tasks in the system`
              });
            }
          }
        });

        // Find potential stretch assignments (tasks with higher complexity)
        const stretchOpportunities = tasks.filter(task => 
          !task.assignedTo && 
          emp.hasSkill(task.requiredSkill) && 
          task.complexity >= 4
        ).map(task => ({
          id: task.id,
          title: task.title,
          requiredSkill: task.requiredSkill,
          complexity: task.complexity,
          benefit: 'Develop advanced skills and take on challenging work'
        }));

        if (matchingTasks.length > 0 || skillsToLearn.length > 0 || stretchOpportunities.length > 0) {
          opportunities.push({
            employeeId: emp.id,
            employeeName: emp.name,
            currentUtilization: parseFloat(utilization.toFixed(2)),
            availableCapacity: parseFloat(availableCapacity.toFixed(2)),
            currentSkills: emp.skills,
            currentTaskCount: currentTasks.length,
            department: emp.department || 'Unassigned',
            opportunities: {
              matchingTasks: matchingTasks.slice(0, 5), // Top 5
              skillsToLearn: skillsToLearn.slice(0, 3).sort((a, b) => b.unassigned - a.unassigned), // Top 3 by demand
              stretchAssignments: stretchOpportunities.slice(0, 3) // Top 3
            },
            recommendations: this.generateGrowthRecommendations(emp, matchingTasks, skillsToLearn, stretchOpportunities)
          });
        }
      }
    });

    return {
      opportunities: opportunities.sort((a, b) => a.currentUtilization - b.currentUtilization),
      summary: {
        totalUnderutilized: opportunities.length,
        totalAvailableCapacity: parseFloat(
          opportunities.reduce((sum, opp) => sum + opp.availableCapacity, 0).toFixed(2)
        ),
        totalMatchingTasks: opportunities.reduce((sum, opp) => sum + opp.opportunities.matchingTasks.length, 0),
        totalSkillGaps: opportunities.reduce((sum, opp) => sum + opp.opportunities.skillsToLearn.length, 0)
      }
    };
  }

  /**
   * Generate growth recommendations
   * @param {Object} employee
   * @param {Array} matchingTasks
   * @param {Array} skillsToLearn
   * @param {Array} stretchOpportunities
   * @returns {Array} Recommendations
   */
  generateGrowthRecommendations(employee, matchingTasks, skillsToLearn, stretchOpportunities) {
    const recommendations = [];

    if (matchingTasks.length > 0) {
      recommendations.push({
        type: 'immediate_assignment',
        priority: 'high',
        action: `Assign ${Math.min(matchingTasks.length, 3)} available tasks to ${employee.name}`,
        benefit: 'Increase utilization and productivity',
        tasks: matchingTasks.slice(0, 3).map(t => t.title)
      });
    }

    if (stretchOpportunities.length > 0) {
      recommendations.push({
        type: 'stretch_assignment',
        priority: 'medium',
        action: `Consider stretch assignment for ${employee.name}`,
        benefit: 'Develop advanced skills and leadership potential',
        tasks: stretchOpportunities.slice(0, 2).map(t => t.title)
      });
    }

    if (skillsToLearn.length > 0) {
      const topSkill = skillsToLearn[0];
      recommendations.push({
        type: 'skill_development',
        priority: 'medium',
        action: `Train ${employee.name} in ${topSkill.skill}`,
        benefit: `${topSkill.unassigned} unassigned ${topSkill.skill} tasks could be assigned`,
        suggestedSkills: skillsToLearn.slice(0, 2).map(s => s.skill)
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        type: 'monitor',
        priority: 'low',
        action: `Continue monitoring ${employee.name}'s workload`,
        benefit: 'Maintain flexibility for future assignments'
      });
    }

    return recommendations;
  }

  /**
   * Predict future workload bottlenecks based on due dates
   * @returns {Object} Future workload forecast
   */
  getFutureWorkloadForecast() {
    const employees = workloadService.employees;
    const tasks = workloadService.tasks;
    const today = new Date();

    // Group tasks by week for the next 8 weeks
    const weeklyForecast = [];
    for (let week = 0; week < 8; week++) {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() + (week * 7));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      const weekData = {
        week: week + 1,
        startDate: weekStart.toISOString().split('T')[0],
        endDate: weekEnd.toISOString().split('T')[0],
        totalTasks: 0,
        criticalTasks: 0,
        estimatedHours: 0,
        employeeForecasts: []
      };

      // Calculate per-employee forecast for this week
      employees.forEach(emp => {
        const employeeTasks = tasks.filter(task => {
          if (task.assignedTo !== emp.id || !task.dueDate) return false;
          
          const dueDate = new Date(task.dueDate);
          return dueDate >= weekStart && dueDate <= weekEnd;
        });

        if (employeeTasks.length > 0) {
          const weekHours = employeeTasks.reduce((sum, task) => sum + task.calculateLoad(), 0);
          const projectedUtilization = ((emp.currentHours + weekHours) / emp.capacityHours) * 100;
          
          weekData.totalTasks += employeeTasks.length;
          weekData.criticalTasks += employeeTasks.filter(t => t.urgency === 3).length;
          weekData.estimatedHours += weekHours;

          weekData.employeeForecasts.push({
            employeeId: emp.id,
            employeeName: emp.name,
            currentUtilization: parseFloat(emp.getUtilization().toFixed(2)),
            projectedUtilization: parseFloat(projectedUtilization.toFixed(2)),
            tasksDue: employeeTasks.length,
            hoursRequired: parseFloat(weekHours.toFixed(2)),
            status: projectedUtilization > 95 ? 'Critical' : 
                    projectedUtilization >= 85 ? 'Overloaded' :
                    projectedUtilization >= 70 ? 'Optimal' :
                    projectedUtilization >= 50 ? 'Underutilized' : 'Available',
            isBottleneck: projectedUtilization > 95
          });
        }
      });

      weekData.employeeForecasts.sort((a, b) => b.projectedUtilization - a.projectedUtilization);
      weeklyForecast.push(weekData);
    }

    // Identify bottlenecks
    const bottlenecks = [];
    const warnings = [];

    weeklyForecast.forEach(week => {
      const criticalEmployees = week.employeeForecasts.filter(e => e.isBottleneck);
      const overloadedEmployees = week.employeeForecasts.filter(e => e.status === 'Overloaded');

      if (criticalEmployees.length > 0) {
        bottlenecks.push({
          week: week.week,
          weekStart: week.startDate,
          severity: 'critical',
          affectedEmployees: criticalEmployees.length,
          employees: criticalEmployees.map(e => ({
            name: e.employeeName,
            projectedUtilization: e.projectedUtilization,
            tasksDue: e.tasksDue
          })),
          recommendation: `Week ${week.week}: ${criticalEmployees.length} employee(s) projected to exceed capacity. Redistribute tasks immediately.`
        });
      }

      if (overloadedEmployees.length > 2) {
        warnings.push({
          week: week.week,
          weekStart: week.startDate,
          severity: 'warning',
          affectedEmployees: overloadedEmployees.length,
          recommendation: `Week ${week.week}: ${overloadedEmployees.length} employees will be heavily loaded. Monitor closely.`
        });
      }
    });

    return {
      weeklyForecast: weeklyForecast,
      bottlenecks: bottlenecks,
      warnings: warnings,
      summary: {
        totalWeeksAnalyzed: 8,
        bottlenecksDetected: bottlenecks.length,
        warningsIssued: warnings.length,
        peakWeek: weeklyForecast.reduce((max, week) => 
          week.totalTasks > max.totalTasks ? week : max, weeklyForecast[0]
        )
      }
    };
  }
}

module.exports = new AnalyticsService();
