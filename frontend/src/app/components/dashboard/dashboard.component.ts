import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkloadService } from '../../services/workload.service';
import { WorkloadStats } from '../../models/workload.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: WorkloadStats | null = null;
  loading = true;
  error: string | null = null;

  constructor(private workloadService: WorkloadService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;
    this.error = null;

    this.workloadService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load statistics';
        this.loading = false;
        console.error('Error loading stats:', err);
      }
    });
  }

  getDistributionPercentage(count: number): number {
    if (!this.stats) return 0;
    return (count / this.stats.totalEmployees) * 100;
  }
}
