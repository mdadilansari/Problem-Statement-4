import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SkillGap {
  skill: string;
  demand: number;
  supply: number;
  demandHours: number;
  supplyCapacity: number;
  unassignedTasks: number;
  employees: Array<{ id: string; name: string; utilization: number }>;
  status: string;
  severity: 'high' | 'medium' | 'low' | 'none';
  recommendation: string;
}

export interface SkillGapAnalysis {
  summary: {
    totalSkillsRequired: number;
    totalSkillsAvailable: number;
    criticalGaps: number;
    moderateGaps: number;
    balanced: number;
    surpluses: number;
  };
  gaps: SkillGap[];
  balanced: SkillGap[];
  surpluses: SkillGap[];
}

export interface TrendData {
  date: string;
  averageUtilization: number;
  overloadedCount: number;
  optimalCount: number;
  underutilizedCount: number;
  totalTasks: number;
}

export interface WorkloadTrends {
  trends: TrendData[];
  summary: {
    currentUtilization: number;
    trend: string;
    projectedUtilization: number;
    daysAnalyzed: number;
  };
}

export interface DepartmentAnalytics {
  name: string;
  employeeCount: number;
  totalCapacity: number;
  totalWorkload: number;
  employees: Array<{ id: string; name: string; utilization: number }>;
  averageUtilization: number;
  skills: string[];
  workloadState: string;
}

export interface DepartmentAnalyticsResponse {
  departments: DepartmentAnalytics[];
  summary: {
    totalDepartments: number;
    mostUtilized: DepartmentAnalytics;
    leastUtilized: DepartmentAnalytics;
  };
}

export interface BurnoutRisk {
  employeeId: string;
  employeeName: string;
  riskScore: number;
  riskLevel: 'High' | 'Medium' | 'Low';
  utilization: number;
  taskCount: number;
  riskFactors: string[];
  recommendation: string;
}

export interface BurnoutRiskAnalysis {
  atRisk: BurnoutRisk[];
  all: BurnoutRisk[];
  summary: {
    highRisk: number;
    mediumRisk: number;
    lowRisk: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = 'http://localhost:3000/api/analytics';

  constructor(private http: HttpClient) {}

  /**
   * Get skill gap analysis
   */
  getSkillGaps(): Observable<SkillGapAnalysis> {
    return this.http.get<SkillGapAnalysis>(`${this.apiUrl}/skill-gaps`);
  }

  /**
   * Get workload trends over time
   */
  getTrends(): Observable<WorkloadTrends> {
    return this.http.get<WorkloadTrends>(`${this.apiUrl}/trends`);
  }

  /**
   * Get department-wise analytics
   */
  getDepartmentAnalytics(): Observable<DepartmentAnalyticsResponse> {
    return this.http.get<DepartmentAnalyticsResponse>(`${this.apiUrl}/departments`);
  }

  /**
   * Get burnout risk analysis
   */
  getBurnoutRisk(): Observable<BurnoutRiskAnalysis> {
    return this.http.get<BurnoutRiskAnalysis>(`${this.apiUrl}/burnout-risk`);
  }

  /**
   * Get severity badge class
   */
  getSeverityClass(severity: string): string {
    const classes: { [key: string]: string } = {
      'high': 'danger',
      'medium': 'warning',
      'low': 'info',
      'none': 'secondary'
    };
    return classes[severity] || 'secondary';
  }

  /**
   * Get risk level badge class
   */
  getRiskLevelClass(level: string): string {
    const classes: { [key: string]: string } = {
      'High': 'danger',
      'Medium': 'warning',
      'Low': 'success'
    };
    return classes[level] || 'secondary';
  }
}
