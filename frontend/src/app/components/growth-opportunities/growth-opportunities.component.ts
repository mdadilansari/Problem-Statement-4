import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowthForecastService, GrowthOpportunitiesResponse, GrowthOpportunity } from '../../services/growth-forecast.service';

@Component({
  selector: 'app-growth-opportunities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './growth-opportunities.component.html',
  styleUrls: ['./growth-opportunities.component.scss']
})
export class GrowthOpportunitiesComponent implements OnInit {
  data: GrowthOpportunitiesResponse | null = null;
  loading = true;
  error: string | null = null;

  constructor(private growthService: GrowthForecastService) {}

  ngOnInit(): void {
    this.loadOpportunities();
  }

  loadOpportunities(): void {
    this.loading = true;
    this.growthService.getGrowthOpportunities().subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load growth opportunities';
        this.loading = false;
        console.error(err);
      }
    });
  }

  getPriorityClass(priority: string): string {
    return this.growthService.getPriorityClass(priority);
  }

  getOpportunityIcon(type: string): string {
    return this.growthService.getOpportunityIcon(type);
  }
}
