import { NextResponse } from 'next/server';
import { mockInstructorData } from '@/utils/mockData';

export async function GET() {
  try {
    return NextResponse.json(mockInstructorData);
  } catch (error) {
    console.error('Failed to fetch instructor data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch instructor data' },
      { status: 500 }
    );
  }
} 