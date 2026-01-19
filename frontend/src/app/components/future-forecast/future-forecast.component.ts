import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowthForecastService, FutureWorkloadForecast, WeeklyForecast } from '../../services/growth-forecast.service';

@Component({
  selector: 'app-future-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './future-forecast.component.html',
  styleUrls: ['./future-forecast.component.scss']
})
export class FutureForecastComponent implements OnInit {
  forecast: FutureWorkloadForecast | null = null;
  loading = true;
  error: string | null = null;
  selectedWeek: WeeklyForecast | null = null;
  Math = Math;

  constructor(private growthService: GrowthForecastService) {}

  ngOnInit(): void {
    this.loadForecast();
  }

  loadForecast(): void {
    this.loading = true;
    this.growthService.getFutureWorkloadForecast().subscribe({
      next: (data) => {
        this.forecast = data;
        this.selectedWeek = data.weeklyForecast[0];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load future forecast';
        this.loading = false;
        console.error(err);
      }
    });
  }

  selectWeek(week: WeeklyForecast): void {
    this.selectedWeek = week;
  }

  getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      'Critical': 'danger',
      'Overloaded': 'warning',
      'Optimal': 'success',
      'Available': 'info'
    };
    return classes[status] || 'secondary';
  }

  getSeverityClass(severity: string): string {
    return severity === 'critical' ? 'danger' : 'warning';
  }

  hasBottleneck(week: WeeklyForecast): boolean {
    return week.employeeForecasts.some(e => e.isBottleneck);
  }

  hasOverloaded(week: WeeklyForecast): boolean {
    return week.employeeForecasts.some(e => e.status === 'Overloaded');
  }

  isAllBalanced(week: WeeklyForecast): boolean {
    return week.employeeForecasts.every(e => e.status !== 'Overloaded' && !e.isBottleneck);
  }
}
