import { NextResponse } from 'next/server';

export async function GET() {
  // Mock learner data matching the LearnerProgress interface
  const learners = [
    {
      id: '1',
      name: 'John Doe',
      lastSession: '2024-03-20T10:25:00Z',
      sessionsCompleted: 4,
      weeklyGoal: 5,
      currentLevel: 'Intermediate',
      improvement: 15,
      engagementScore: 88,
      alerts: [
        {
          type: 'info',
          message: 'Close to achieving weekly goal'
        }
      ]
    },
    {
      id: '2',
      name: 'Jane Smith',
      lastSession: '2024-03-19T15:00:00Z',
      sessionsCompleted: 5,
      weeklyGoal: 5,
      currentLevel: 'Advanced',
      improvement: 22,
      engagementScore: 94,
      alerts: []
    },
    {
      id: '3',
      name: 'Mike Johnson',
      lastSession: '2024-03-18T09:43:00Z',
      sessionsCompleted: 2,
      weeklyGoal: 5,
      currentLevel: 'Beginner',
      improvement: 8,
      engagementScore: 75,
      alerts: [
        {
          type: 'warning',
          message: 'Below weekly session target'
        },
        {
          type: 'info',
          message: 'Showing steady improvement in fluency'
        }
      ]
    }
  ];

  return NextResponse.json(learners);
} 