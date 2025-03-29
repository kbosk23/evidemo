import { NextResponse } from 'next/server';
import { mockAnalytics } from '@/utils/mockData';

export async function GET() {
  try {
    return NextResponse.json(mockAnalytics);
  } catch (error) {
    console.error('Failed to fetch analytics data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
} 