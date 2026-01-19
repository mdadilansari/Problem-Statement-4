import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GrowthOpportunity {
  employeeId: string;
  employeeName: string;
  currentUtilization: number;
  availableCapacity: number;
  currentSkills: string[];
  currentTaskCount: number;
  department: string;
  opportunities: {
    matchingTasks: Array<{
      id: string;
      title: string;
      requiredSkill: string;
      estimatedHours: number;
      complexity: number;
      urgency: number;
      isStretchAssignment: boolean;
    }>;
    skillsToLearn: Array<{
      skill: string;
      demand: number;
      unassigned: number;
      reason: string;
    }>;
    stretchAssignments: Array<{
      id: string;
      title: string;
      requiredSkill: string;
      complexity: number;
      benefit: string;
    }>;
  };
  recommendations: Array<{
    type: string;
    priority: string;
    action: string;
    benefit: string;
    tasks?: string[];
    suggestedSkills?: string[];
  }>;
}

export interface GrowthOpportunitiesResponse {
  opportunities: GrowthOpportunity[];
  summary: {
    totalUnderutilized: number;
    totalAvailableCapacity: number;
    totalMatchingTasks: number;
    totalSkillGaps: number;
  };
}

export interface EmployeeForecast {
  employeeId: string;
  employeeName: string;
  currentUtilization: number;
  projectedUtilization: number;
  tasksDue: number;
  hoursRequired: number;
  status: string;
  isBottleneck: boolean;
}

export interface WeeklyForecast {
  week: number;
  startDate: string;
  endDate: string;
  totalTasks: number;
  criticalTasks: number;
  estimatedHours: number;
  employeeForecasts: EmployeeForecast[];
}

export interface Bottleneck {
  week: number;
  weekStart: string;
  severity: string;
  affectedEmployees: number;
  employees: Array<{
    name: string;
    projectedUtilization: number;
    tasksDue: number;
  }>;
  recommendation: string;
}

export interface FutureWorkloadForecast {
  weeklyForecast: WeeklyForecast[];
  bottlenecks: Bottleneck[];
  warnings: Array<{
    week: number;
    weekStart: string;
    severity: string;
    affectedEmployees: number;
    recommendation: string;
  }>;
  summary: {
    totalWeeksAnalyzed: number;
    bottlenecksDetected: number;
    warningsIssued: number;
    peakWeek: WeeklyForecast;
  };
}

@Injectable({
  providedIn: 'root'
})
export class GrowthForecastService {
  private apiUrl = 'http://localhost:3000/api/analytics';

  constructor(private http: HttpClient) {}

  /**
   * Get growth opportunities for underutilized employees
   */
  getGrowthOpportunities(): Observable<GrowthOpportunitiesResponse> {
    return this.http.get<GrowthOpportunitiesResponse>(`${this.apiUrl}/growth-opportunities`);
  }

  /**
   * Get future workload forecast
   */
  getFutureWorkloadForecast(): Observable<FutureWorkloadForecast> {
    return this.http.get<FutureWorkloadForecast>(`${this.apiUrl}/future-forecast`);
  }

  /**
   * Get priority badge class
   */
  getPriorityClass(priority: string): string {
    const classes: { [key: string]: string } = {
      'high': 'danger',
      'medium': 'warning',
      'low': 'info'
    };
    return classes[priority] || 'secondary';
  }

  /**
   * Get opportunity type icon
   */
  getOpportunityIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'immediate_assignment': 'bi-clipboard-check',
      'stretch_assignment': 'bi-trophy',
      'skill_development': 'bi-book',
      'monitor': 'bi-eye'
    };
    return icons[type] || 'bi-info-circle';
  }
}
