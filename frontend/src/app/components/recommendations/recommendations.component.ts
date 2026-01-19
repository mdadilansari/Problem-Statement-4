import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkloadService } from '../../services/workload.service';
import { Recommendation, RecommendationResponse } from '../../models/workload.model';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {
  recommendationData: RecommendationResponse | null = null;
  loading = true;
  error: string | null = null;

  constructor(private workloadService: WorkloadService) {}

  ngOnInit(): void {
    this.loadRecommendations();
  }

  loadRecommendations(): void {
    this.loading = true;
    this.error = null;

    this.workloadService.getRecommendations().subscribe({
      next: (data) => {
        this.recommendationData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load recommendations';
        this.loading = false;
        console.error('Error loading recommendations:', err);
      }
    });
  }

  getPriorityClass(priority: number): string {
    if (priority >= 50) return 'priority-high';
    if (priority >= 30) return 'priority-medium';
    return 'priority-low';
  }

  getUrgencyLabel(urgency: number): string {
    const labels = ['', 'Low', 'Medium', 'High'];
    return labels[urgency] || 'Unknown';
  }

  getComplexityLabel(complexity: number): string {
    const labels = ['', 'Very Low', 'Low', 'Medium', 'High', 'Very High'];
    return labels[complexity] || 'Unknown';
  }
}
