import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkloadService } from '../../services/workload.service';
import { Employee } from '../../models/workload.model';

@Component({
  selector: 'app-workload-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workload-summary.component.html',
  styleUrls: ['./workload-summary.component.scss']
})
export class WorkloadSummaryComponent implements OnInit {
  employees: Employee[] = [];
  loading = true;
  error: string | null = null;

  constructor(private workloadService: WorkloadService) {}

  ngOnInit(): void {
    this.loadWorkloadSummary();
  }

  loadWorkloadSummary(): void {
    this.loading = true;
    this.error = null;

    this.workloadService.getWorkloadSummary().subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load workload summary';
        this.loading = false;
        console.error('Error loading workload summary:', err);
      }
    });
  }

  getWorkloadClass(state: string): string {
    return this.workloadService.getWorkloadStateClass(state);
  }

  getUtilizationBarClass(state: string): string {
    return state.toLowerCase();
  }
}
