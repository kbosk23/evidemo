import { NextResponse } from 'next/server';
import { mockSessions } from '@/utils/mockData';

export async function GET() {
  try {
    return NextResponse.json(mockSessions);
  } catch (error) {
    console.error('Failed to fetch sessions data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sessions data' },
      { status: 500 }
    );
  }
} 