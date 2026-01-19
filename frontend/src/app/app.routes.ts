import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WorkloadSummaryComponent } from './components/workload-summary/workload-summary.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { SkillGapsComponent } from './components/skill-gaps/skill-gaps.component';
import { TrendsComponent } from './components/trends/trends.component';
import { DepartmentAnalyticsComponent } from './components/department-analytics/department-analytics.component';
import { BurnoutRiskComponent } from './components/burnout-risk/burnout-risk.component';
import { GrowthOpportunitiesComponent } from './components/growth-opportunities/growth-opportunities.component';
import { FutureForecastComponent } from './components/future-forecast/future-forecast.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'summary', component: WorkloadSummaryComponent },
  { path: 'recommendations', component: RecommendationsComponent },
  { path: 'skill-gaps', component: SkillGapsComponent },
  { path: 'trends', component: TrendsComponent },
  { path: 'departments', component: DepartmentAnalyticsComponent },
  { path: 'burnout-risk', component: BurnoutRiskComponent },
  { path: 'growth-opportunities', component: GrowthOpportunitiesComponent },
  { path: 'future-forecast', component: FutureForecastComponent },
  { path: '**', redirectTo: '/dashboard' }
];
