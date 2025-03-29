import { NextResponse } from 'next/server';
import * as db from '@/utils/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const session = await db.createSession(data);
    return NextResponse.json(session);
  } catch (error) {
    console.error('Failed to create session:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { sessionId, ...data } = await request.json();
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    if (data.endSession) {
      const session = await db.endSession(sessionId);
      return NextResponse.json(session);
    }

    if (data.prosodyData) {
      const session = await db.updateSessionProsody(sessionId, data.prosodyData);
      return NextResponse.json(session);
    }

    return NextResponse.json(
      { error: 'Invalid update operation' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Failed to update session:', error);
    return NextResponse.json(
      { error: 'Failed to update session' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tutorId = searchParams.get('tutorId');
    const sessions = await db.getSessions(tutorId || undefined);
    return NextResponse.json(sessions);
  } catch (error) {
    console.error('Failed to fetch sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
} 