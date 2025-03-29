import { NextResponse } from 'next/server';
import { mockLearners } from '@/utils/mockData';

interface FlowTrends {
  averageFlowScore: number;
  timeInFlowPercentage: number;
  mostProductiveTimeOfDay: string;
  challengeSkillBalance: number;
  flowStateFrequency: number;
  consistentFlowDays: number;
}

export async function GET() {
  try {
    return NextResponse.json(mockLearners);
  } catch (error) {
    console.error('Failed to fetch learners data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch learners data' },
      { status: 500 }
    );
  }
} 