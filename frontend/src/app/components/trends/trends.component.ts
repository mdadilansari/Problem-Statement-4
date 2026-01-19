import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService, WorkloadTrends, TrendData } from '../../services/analytics.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-trends',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('utilizationChart') utilizationChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('distributionChart') distributionChartRef!: ElementRef<HTMLCanvasElement>;
  
  trends: WorkloadTrends | null = null;
  loading = true;
  error: string | null = null;
  selectedPeriod = 30;
  utilizationChart: Chart | null = null;
  distributionChart: Chart | null = null;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadTrends();
  }

  ngAfterViewInit(): void {
    // Charts will be created after data loads
  }

  loadTrends(): void {
    this.loading = true;
    this.analyticsService.getTrends().subscribe({
      next: (data) => {
        this.trends = data;
        this.loading = false;
        setTimeout(() => this.createCharts(), 100);
      },
      error: (err) => {
        this.error = 'Failed to load trend data';
        this.loading = false;
        console.error(err);
      }
    });
  }

  createCharts(): void {
    if (!this.trends) return;

    this.createUtilizationChart();
    this.createDistributionChart();
  }

  createUtilizationChart(): void {
    if (!this.trends || !this.utilizationChartRef) return;

    if (this.utilizationChart) {
      this.utilizationChart.destroy();
    }

    const last14Days = this.trends.trends.slice(-14);
    const ctx = this.utilizationChartRef.nativeElement.getContext('2d');
    
    if (!ctx) return;

    this.utilizationChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: last14Days.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
        datasets: [
          {
            label: 'Average Utilization',
            data: last14Days.map(d => d.averageUtilization),
            borderColor: 'rgb(0, 153, 153)',
            backgroundColor: 'rgba(0, 153, 153, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Critical Threshold (95%)',
            data: last14Days.map(() => 95),
            borderColor: 'rgb(226, 0, 21)',
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 0,
            fill: false
          },
          {
            label: 'Optimal Range (70-85%)',
            data: last14Days.map(() => 70),
            borderColor: 'rgb(0, 163, 68)',
            borderDash: [5, 5],
            borderWidth: 1,
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Utilization (%)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          }
        }
      }
    });
  }

  createDistributionChart(): void {
    if (!this.trends || !this.distributionChartRef) return;

    if (this.distributionChart) {
      this.distributionChart.destroy();
    }

    const last7Days = this.trends.trends.slice(-7);
    const ctx = this.distributionChartRef.nativeElement.getContext('2d');
    
    if (!ctx) return;

    this.distributionChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: last7Days.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
        datasets: [
          {
            label: 'Critical',
            data: last7Days.map(d => d.criticalCount || 0),
            backgroundColor: 'rgba(226, 0, 21, 0.8)'
          },
          {
            label: 'Overloaded',
            data: last7Days.map(d => d.overloadedCount),
            backgroundColor: 'rgba(255, 158, 24, 0.8)'
          },
          {
            label: 'Optimal',
            data: last7Days.map(d => d.optimalCount),
            backgroundColor: 'rgba(0, 163, 68, 0.8)'
          },
          {
            label: 'Underutilized',
            data: last7Days.map(d => d.underutilizedCount || 0),
            backgroundColor: 'rgba(0, 102, 177, 0.8)'
          },
          {
            label: 'Available',
            data: last7Days.map(d => d.availableCount || 0),
            backgroundColor: 'rgba(140, 140, 140, 0.8)'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Employees'
            },
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.utilizationChart) {
      this.utilizationChart.destroy();
    }
    if (this.distributionChart) {
      this.distributionChart.destroy();
    }
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
