import { NextResponse } from 'next/server';

export async function GET() {
  // Mock analytics data
  const flowAnalytics = {
    dailyAverages: [
      {
        date: '2024-03-20',
        averageFlowScore: 85,
        timeInFlow: 280,
        totalTime: 350,
        studentsInFlow: 18,
        totalStudents: 25
      },
      {
        date: '2024-03-19',
        averageFlowScore: 82,
        timeInFlow: 265,
        totalTime: 340,
        studentsInFlow: 20,
        totalStudents: 25
      },
      {
        date: '2024-03-18',
        averageFlowScore: 88,
        timeInFlow: 290,
        totalTime: 345,
        studentsInFlow: 22,
        totalStudents: 25
      },
      {
        date: '2024-03-17',
        averageFlowScore: 79,
        timeInFlow: 250,
        totalTime: 330,
        studentsInFlow: 17,
        totalStudents: 25
      },
      {
        date: '2024-03-16',
        averageFlowScore: 86,
        timeInFlow: 275,
        totalTime: 340,
        studentsInFlow: 21,
        totalStudents: 25
      }
    ],
    topPerformers: [
      {
        name: 'Ana García',
        averageFlowScore: 93,
        consistentDays: 5,
        preferredTime: 'Afternoon'
      },
      {
        name: 'Juan Pérez',
        averageFlowScore: 88,
        consistentDays: 4,
        preferredTime: 'Morning'
      },
      {
        name: 'Sofia Martinez',
        averageFlowScore: 87,
        consistentDays: 4,
        preferredTime: 'Evening'
      },
      {
        name: 'Carlos Rodriguez',
        averageFlowScore: 85,
        consistentDays: 3,
        preferredTime: 'Morning'
      }
    ],
    overallMetrics: {
      averageFlowScore: 84,
      totalTimeInFlow: 1360,
      totalSessionTime: 1705,
      studentsAchievingFlow: 19,
      totalStudents: 25,
      averageFlowDuration: 45
    },
    flowDistribution: {
      optimal: 35,
      moderate: 45,
      needsImprovement: 20
    }
  };

  return NextResponse.json(flowAnalytics);
} 