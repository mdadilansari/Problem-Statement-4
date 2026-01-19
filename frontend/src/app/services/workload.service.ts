import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ApiResponse,
  Employee,
  Task,
  Imbalances,
  RecommendationResponse,
  WorkloadStats
} from '../models/workload.model';

@Injectable({
  providedIn: 'root'
})
export class WorkloadService {
  private apiUrl = 'http://localhost:3000/api/workload';

  constructor(private http: HttpClient) {}

  /**
   * Get workload summary for all employees
   */
  getWorkloadSummary(): Observable<Employee[]> {
    return this.http.get<ApiResponse<Employee[]>>(`${this.apiUrl}/summary`)
      .pipe(map(response => response.data || []));
  }

  /**
   * Get workload imbalances
   */
  getImbalances(): Observable<Imbalances> {
    return this.http.get<ApiResponse<Imbalances>>(`${this.apiUrl}/imbalances`)
      .pipe(map(response => response.data!));
  }

  /**
   * Get rebalancing recommendations
   */
  getRecommendations(): Observable<RecommendationResponse> {
    return this.http.get<ApiResponse<RecommendationResponse>>(`${this.apiUrl}/recommendations`)
      .pipe(map(response => response.data!));
  }

  /**
   * Get all tasks
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<ApiResponse<Task[]>>(`${this.apiUrl}/tasks`)
      .pipe(map(response => response.data || []));
  }

  /**
   * Get employee details with tasks
   */
  getEmployeeDetails(employeeId: string): Observable<Employee> {
    return this.http.get<ApiResponse<Employee>>(`${this.apiUrl}/employee/${employeeId}`)
      .pipe(map(response => response.data!));
  }

  /**
   * Get workload statistics
   */
  getStats(): Observable<WorkloadStats> {
    return this.http.get<ApiResponse<WorkloadStats>>(`${this.apiUrl}/stats`)
      .pipe(map(response => response.data!));
  }

  /**
   * Simulate task reassignment
   */
  simulateReassignment(taskId: string, fromEmployeeId: string, toEmployeeId: string): Observable<any> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/simulate`, {
      taskId,
      fromEmployeeId,
      toEmployeeId
    }).pipe(map(response => response.data));
  }

  /**
   * Get workload state CSS class
   */
  getWorkloadStateClass(state: string): string {
    return `status-${state.toLowerCase()}`;
  }

  /**
   * Get workload state color for charts
   */
  getWorkloadStateColor(state: string): string {
    const colors: { [key: string]: string } = {
      'Critical': '#d32f2f',
      'Overloaded': '#f57c00',
      'Optimal': '#388e3c',
      'Underutilized': '#1976d2',
      'Available': '#757575'
    };
    return colors[state] || '#757575';
  }
}
