import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService, DepartmentAnalyticsResponse, DepartmentAnalytics } from '../../services/analytics.service';

@Component({
  selector: 'app-department-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './department-analytics.component.html',
  styleUrls: ['./department-analytics.component.scss']
})
export class DepartmentAnalyticsComponent implements OnInit {
  analytics: DepartmentAnalyticsResponse | null = null;
  loading = true;
  error: string | null = null;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.loading = true;
    this.analyticsService.getDepartmentAnalytics().subscribe({
      next: (data) => {
        this.analytics = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load department analytics';
        this.loading = false;
        console.error(err);
      }
    });
  }

  getWorkloadStateClass(state: string): string {
    const classes: { [key: string]: string } = {
      'Critical': 'danger',
      'Overloaded': 'warning',
      'Optimal': 'success',
      'Underutilized': 'info',
      'Available': 'secondary'
    };
    return classes[state] || 'secondary';
  }

  getUtilizationWidth(dept: DepartmentAnalytics): number {
    return Math.min(100, dept.averageUtilization);
  }
}
