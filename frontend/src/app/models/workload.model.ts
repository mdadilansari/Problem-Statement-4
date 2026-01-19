export interface Employee {
  id: string;
  name: string;
  skills: string[];
  capacityHours: number;
  currentHours: number;
  utilization: number;
  workloadState: WorkloadState;
  assignedTasks?: number;
  tasks?: Task[];
}

export interface Task {
  id: string;
  title: string;
  estimatedHours: number;
  complexity: number;
  complexityLabel?: string;
  urgency: number;
  urgencyLabel?: string;
  requiredSkill: string;
  assignedTo: string | null;
  assignedToName?: string | null;
  calculatedLoad: number;
}

export type WorkloadState = 'Critical' | 'Overloaded' | 'Optimal' | 'Underutilized' | 'Available';

export interface Imbalances {
  overloaded: Employee[];
  underutilized: Employee[];
  available: Employee[];
  summary: {
    totalEmployees: number;
    overloadedCount: number;
    underutilizedCount: number;
    availableCount: number;
  };
}

export interface Recommendation {
  taskId: string;
  taskTitle: string;
  taskLoad: number;
  estimatedHours: number;
  complexity: number;
  urgency: number;
  requiredSkill: string;
  from: {
    id: string;
    name: string;
    currentUtilization: number;
    newUtilization: number;
    currentHours: number;
    newHours: number;
  };
  to: {
    id: string;
    name: string;
    currentUtilization: number;
    newUtilization: number;
    currentHours: number;
    newHours: number;
  };
  improvement: number;
  reasoning: string;
  priority: number;
}

export interface RecommendationResponse {
  recommendations: Recommendation[];
  statistics: {
    overloadedEmployees: number;
    availableEmployees: number;
    potentialMoves: number;
    topRecommendations?: number;
  };
  message: string;
}

export interface WorkloadStats {
  totalEmployees: number;
  totalTasks: number;
  averageUtilization: number;
  workloadDistribution: {
    critical: number;
    overloaded: number;
    optimal: number;
    underutilized: number;
    available: number;
  };
  imbalancesSummary: {
    totalEmployees: number;
    overloadedCount: number;
    underutilizedCount: number;
    availableCount: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
