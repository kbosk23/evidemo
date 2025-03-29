import { NextResponse } from 'next/server';
import { subDays } from 'date-fns';

export async function GET() {
  // Generate mock data
  const mockData = {
    overview: {
      totalSessions: Math.floor(Math.random() * 30) + 20, // 20-50 sessions
      totalDuration: (Math.random() * 2000 + 1000) * 60, // 1000-3000 minutes in seconds
      averageScore: Math.floor(Math.random() * 20) + 75, // 75-95%
      totalInteractions: Math.floor(Math.random() * 1000) + 500, // 500-1500 interactions
    },
    progress: {
      comprehension: Math.floor(Math.random() * 30) + 65, // 65-95%
      fluency: Math.floor(Math.random() * 30) + 65, // 65-95%
      engagement: Math.floor(Math.random() * 30) + 65, // 65-95%
      weeklyGoal: 5,
      sessionsCompleted: Math.floor(Math.random() * 6), // 0-5 sessions
    },
    recentSessions: Array.from({ length: 5 }, (_, i) => ({
      id: `session-${i + 1}`,
      date: subDays(new Date(), i).toISOString(),
      duration: (Math.random() * 45 + 15) * 60, // 15-60 minutes in seconds
      score: Math.floor(Math.random() * 30) + 65, // 65-95%
      interactions: Math.floor(Math.random() * 50) + 20, // 20-70 interactions
    })),
    skillProgress: [
      {
        skill: "Reading Comprehension",
        progress: Math.floor(Math.random() * 30) + 65,
        level: "B2",
      },
      {
        skill: "Speaking Fluency",
        progress: Math.floor(Math.random() * 30) + 65,
        level: "B1",
      },
      {
        skill: "Vocabulary",
        progress: Math.floor(Math.random() * 30) + 65,
        level: "B2",
      },
      {
        skill: "Grammar",
        progress: Math.floor(Math.random() * 30) + 65,
        level: "B1",
      },
    ],
  };

  return NextResponse.json(mockData);
} 