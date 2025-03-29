export interface FlowMetrics {
  challengeSkillBalance: number;
  concentration: number;
  clearGoals: number;
  feedback: number;
  control: number;
  immersion: number;
  timePerception: number;
  intrinsicMotivation: number;
  flowScore: number;
  timeInFlow: number;
  totalSessionTime: number;
}

export interface FlowInsight {
  type: 'highFlow' | 'moderateFlow' | 'lowFlow' | 'challengeTooHigh' | 'challengeTooLow';
  message: string;
}

export interface FlowTrend {
  timestamp: string;
  flowScore: number;
  duration: number;
} 