import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService, BurnoutRiskAnalysis, BurnoutRisk } from '../../services/analytics.service';

@Component({
  selector: 'app-burnout-risk',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './burnout-risk.component.html',
  styleUrls: ['./burnout-risk.component.scss']
})
export class BurnoutRiskComponent implements OnInit {
  analysis: BurnoutRiskAnalysis | null = null;
  loading = true;
  error: string | null = null;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadRiskAnalysis();
  }

  loadRiskAnalysis(): void {
    this.loading = true;
    this.analyticsService.getBurnoutRisk().subscribe({
      next: (data) => {
        this.analysis = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load burnout risk analysis';
        this.loading = false;
        console.error(err);
      }
    });
  }

  getRiskLevelClass(level: string): string {
    return this.analyticsService.getRiskLevelClass(level);
  }

  getRiskScoreWidth(score: number): number {
    return Math.min(100, score);
  }
}
