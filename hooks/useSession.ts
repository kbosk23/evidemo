import { useState, useCallback } from 'react';

interface SessionState {
  id: string | null;
  tutorId: string | null;
  isActive: boolean;
}

export function useSession() {
  const [session, setSession] = useState<SessionState>({
    id: null,
    tutorId: null,
    isActive: false,
  });

  const startSession = useCallback(async (tutorId: string) => {
    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tutorId }),
      });

      if (!response.ok) {
        throw new Error('Failed to start session');
      }

      const data = await response.json();
      setSession({
        id: data.id,
        tutorId,
        isActive: true,
      });

      return data.id;
    } catch (error) {
      console.error('Error starting session:', error);
      throw error;
    }
  }, []);

  const endSession = useCallback(async () => {
    if (!session.id) return;

    try {
      await fetch('/api/sessions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: session.id,
          endSession: true,
        }),
      });

      setSession({
        id: null,
        tutorId: null,
        isActive: false,
      });
    } catch (error) {
      console.error('Error ending session:', error);
      throw error;
    }
  }, [session.id]);

  const addMessage = useCallback(async (content: string, role: 'user' | 'assistant', prosody?: any) => {
    if (!session.id) return;

    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: session.id,
          content,
          role,
          prosody,
        }),
      });
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  }, [session.id]);

  const updateProsody = useCallback(async (prosodyData: any) => {
    if (!session.id) return;

    try {
      await fetch('/api/sessions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: session.id,
          prosodyData,
        }),
      });
    } catch (error) {
      console.error('Error updating prosody data:', error);
      throw error;
    }
  }, [session.id]);

  return {
    session,
    startSession,
    endSession,
    addMessage,
    updateProsody,
  };
} 