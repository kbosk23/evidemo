// Mock database utility for development
export const addMessage = async (sessionId: string, messageData: any) => {
  console.log('Adding message:', { sessionId, messageData });
  return { id: 'mock-message-id', sessionId, ...messageData };
};

export const getSessionMessages = async (sessionId: string) => {
  console.log('Getting session messages:', sessionId);
  return [];
};

export const createSession = async (data: any) => {
  console.log('Creating session:', data);
  return { id: 'mock-session-id', ...data };
};

export const endSession = async (sessionId: string) => {
  console.log('Ending session:', sessionId);
  return { id: sessionId, status: 'completed' };
};

export const updateSessionProsody = async (sessionId: string, prosodyData: any) => {
  console.log('Updating session prosody:', { sessionId, prosodyData });
  return { id: sessionId, prosody: prosodyData };
};

export const getSessions = async (tutorId?: string) => {
  console.log('Getting all sessions', tutorId ? `for tutor: ${tutorId}` : '');
  return [];
};

// Legacy db object for compatibility
export const db = {
  messages: {
    create: addMessage,
    findMany: getSessionMessages,
  },
  sessions: {
    create: createSession,
    findMany: getSessions,
    findFirst: async () => null,
  },
}; 