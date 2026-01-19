import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService, WorkloadTrends, TrendData } from '../../services/analytics.service';

@Component({
  selector: 'app-trends',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {
  trends: WorkloadTrends | null = null;
  loading = true;
  error: string | null = null;
  selectedPeriod = 30;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadTrends();
  }

  loadTrends(): void {
    this.loading = true;
    this.analyticsService.getTrends().subscribe({
      next: (data) => {
        this.trends = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load trend data';
        this.loading = false;
        console.error(err);
      }
    });
  }

  getUtilizationClass(utilization: number): string {
    if (utilization > 95) return 'danger';
    if (utilization >= 85) return 'warning';
    if (utilization >= 70) return 'success';
    if (utilization >= 50) return 'info';
    return 'secondary';
  }

  getTrendIcon(trend: string): string {
    return trend === 'increasing' ? 'bi-arrow-up' : trend === 'decreasing' ? 'bi-arrow-down' : 'bi-dash';
  }

  getTrendClass(trend: string): string {
    return trend === 'increasing' ? 'text-danger' : trend === 'decreasing' ? 'text-success' : 'text-muted';
  }

  getRecentTrends(count: number = 7): TrendData[] {
    if (!this.trends) return [];
    return this.trends.trends.slice(-count);
  }
}
