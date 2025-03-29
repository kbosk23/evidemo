import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get('start');
  const end = searchParams.get('end');

  // Mock session data matching the SessionData interface
  const sessions = [
    {
      id: '1',
      learnerId: '1',
      learnerName: 'John Doe',
      startTime: '2024-03-20T10:00:00Z',
      endTime: '2024-03-20T10:25:00Z',
      metrics: {
        duration: 1500, // 25 minutes in seconds
        totalMessages: 45,
        learnerMessages: 22,
        tutorMessages: 23,
        averageResponseTime: 8,
        comprehensionScore: 90,
        fluencyScore: 82
      }
    },
    {
      id: '2',
      learnerId: '2',
      learnerName: 'Jane Smith',
      startTime: '2024-03-19T14:30:00Z',
      endTime: '2024-03-19T15:00:00Z',
      metrics: {
        duration: 1800, // 30 minutes in seconds
        totalMessages: 52,
        learnerMessages: 25,
        tutorMessages: 27,
        averageResponseTime: 7,
        comprehensionScore: 95,
        fluencyScore: 89
      }
    },
    {
      id: '3',
      learnerId: '3',
      learnerName: 'Mike Johnson',
      startTime: '2024-03-18T09:15:00Z',
      endTime: '2024-03-18T09:43:00Z',
      metrics: {
        duration: 1680, // 28 minutes in seconds
        totalMessages: 48,
        learnerMessages: 23,
        tutorMessages: 25,
        averageResponseTime: 7.5,
        comprehensionScore: 87,
        fluencyScore: 85
      }
    }
  ];

  return NextResponse.json(sessions);
} 