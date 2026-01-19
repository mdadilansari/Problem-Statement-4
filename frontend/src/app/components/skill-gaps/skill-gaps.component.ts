import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService, SkillGapAnalysis, SkillGap } from '../../services/analytics.service';

@Component({
  selector: 'app-skill-gaps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-gaps.component.html',
  styleUrls: ['./skill-gaps.component.scss']
})
export class SkillGapsComponent implements OnInit {
  analysis: SkillGapAnalysis | null = null;
  loading = true;
  error: string | null = null;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadSkillGaps();
  }

  loadSkillGaps(): void {
    this.loading = true;
    this.analyticsService.getSkillGaps().subscribe({
      next: (data) => {
        this.analysis = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load skill gap analysis';
        this.loading = false;
        console.error(err);
      }
    });
  }

  getSeverityClass(severity: string): string {
    return this.analyticsService.getSeverityClass(severity);
  }

  getProgressValue(gap: SkillGap): number {
    if (gap.supply === 0) return 0;
    return Math.min(100, (gap.supply / gap.demand) * 100);
  }
}
