import { subDays } from 'date-fns';

// Mock data for sessions and analytics
export const mockSessions = [
  {
    id: '1',
    learnerId: 'learner1',
    learnerName: 'John Doe',
    startTime: subDays(new Date(), 1).toISOString(),
    endTime: subDays(new Date(), 1).toISOString(),
    metrics: {
      duration: 1500,
      totalMessages: 45,
      learnerMessages: 22,
      tutorMessages: 23,
      averageResponseTime: 8,
      comprehensionScore: 90,
      fluencyScore: 82,
      flow: {
        challengeSkillBalance: 85,
        concentration: 88,
        clearGoals: 92,
        feedback: 90,
        control: 87,
        immersion: 89,
        timePerception: 84,
        intrinsicMotivation: 91,
        flowScore: 88,
        timeInFlow: 1200,
        totalSessionTime: 1500
      }
    }
  },
  {
    id: '2',
    learnerId: 'learner2',
    learnerName: 'Jane Smith',
    startTime: subDays(new Date(), 2).toISOString(),
    endTime: subDays(new Date(), 2).toISOString(),
    metrics: {
      duration: 1800,
      totalMessages: 52,
      learnerMessages: 25,
      tutorMessages: 27,
      averageResponseTime: 7,
      comprehensionScore: 95,
      fluencyScore: 89,
      flow: {
        challengeSkillBalance: 92,
        concentration: 94,
        clearGoals: 95,
        feedback: 93,
        control: 91,
        immersion: 96,
        timePerception: 90,
        intrinsicMotivation: 94,
        flowScore: 93,
        timeInFlow: 1620,
        totalSessionTime: 1800
      }
    }
  }
];

// Mock analytics data
export const mockAnalytics = {
  overview: {
    totalSessions: 45,
    totalLearners: 12,
    averageSessionDuration: 1800, // 30 minutes in seconds
    totalInteractions: 520
  },
  learningMetrics: {
    averageComprehension: 85,
    averageFluency: 78,
    averageEngagement: 92,
    improvementRate: 15
  },
  sessionDistribution: [
    { date: subDays(new Date(), 6).toISOString(), count: 23 },
    { date: subDays(new Date(), 5).toISOString(), count: 28 },
    { date: subDays(new Date(), 4).toISOString(), count: 25 },
    { date: subDays(new Date(), 3).toISOString(), count: 19 },
    { date: subDays(new Date(), 2).toISOString(), count: 12 },
    { date: subDays(new Date(), 1).toISOString(), count: 14 },
    { date: new Date().toISOString(), count: 31 }
  ],
  comprehensionTrends: [
    { date: subDays(new Date(), 6).toISOString(), value: 82 },
    { date: subDays(new Date(), 5).toISOString(), value: 84 },
    { date: subDays(new Date(), 4).toISOString(), value: 83 },
    { date: subDays(new Date(), 3).toISOString(), value: 86 },
    { date: subDays(new Date(), 2).toISOString(), value: 88 },
    { date: subDays(new Date(), 1).toISOString(), value: 87 },
    { date: new Date().toISOString(), value: 89 }
  ],
  fluencyTrends: [
    { date: subDays(new Date(), 6).toISOString(), value: 75 },
    { date: subDays(new Date(), 5).toISOString(), value: 76 },
    { date: subDays(new Date(), 4).toISOString(), value: 78 },
    { date: subDays(new Date(), 3).toISOString(), value: 77 },
    { date: subDays(new Date(), 2).toISOString(), value: 80 },
    { date: subDays(new Date(), 1).toISOString(), value: 82 },
    { date: new Date().toISOString(), value: 83 }
  ],
  topChallenges: [
    {
      category: "Grammar",
      count: 45,
      percentage: 30
    },
    {
      category: "Vocabulary",
      count: 38,
      percentage: 25
    },
    {
      category: "Pronunciation",
      count: 32,
      percentage: 21
    },
    {
      category: "Listening Comprehension",
      count: 25,
      percentage: 17
    }
  ],
  learnerProgress: [
    {
      category: "Beginner",
      count: 15
    },
    {
      category: "Intermediate",
      count: 22
    },
    {
      category: "Advanced",
      count: 8
    },
    {
      category: "Fluent",
      count: 5
    }
  ]
};

// Mock learner data
export const mockLearners = [
  {
    id: 'learner1',
    name: 'John Doe',
    lastSession: subDays(new Date(), 1).toISOString(),
    sessionsCompleted: 12,
    weeklyGoal: 15,
    currentLevel: 'Intermediate',
    improvement: 15,
    engagementScore: 88,
    flowMetrics: {
      challengeSkillBalance: 85,
      concentration: 90,
      clearGoals: 88,
      feedback: 92,
      control: 87,
      immersion: 89,
      timePerception: 86,
      intrinsicMotivation: 91,
      flowScore: 88,
      timeInFlow: 45,
      totalSessionTime: 60,
      averageFlowScore: 88,
      timeInFlowPercentage: 75,
      mostProductiveTimeOfDay: 'Morning',
      flowStateFrequency: 82,
      consistentFlowDays: 5
    },
    alerts: [
      {
        type: 'info',
        message: 'Close to achieving weekly goal'
      }
    ]
  },
  {
    id: 'learner2',
    name: 'Jane Smith',
    lastSession: subDays(new Date(), 2).toISOString(),
    sessionsCompleted: 15,
    weeklyGoal: 15,
    currentLevel: 'Advanced',
    improvement: 22,
    engagementScore: 94,
    flowMetrics: {
      challengeSkillBalance: 92,
      concentration: 94,
      clearGoals: 95,
      feedback: 93,
      control: 91,
      immersion: 96,
      timePerception: 90,
      intrinsicMotivation: 94,
      flowScore: 93,
      timeInFlow: 55,
      totalSessionTime: 60,
      averageFlowScore: 93,
      timeInFlowPercentage: 90,
      mostProductiveTimeOfDay: 'Afternoon',
      flowStateFrequency: 95,
      consistentFlowDays: 7
    },
    alerts: [
      {
        type: 'info',
        message: 'Maintaining excellent flow state'
      }
    ]
  },
  {
    id: 'learner3',
    name: 'Mike Johnson',
    lastSession: subDays(new Date(), 3).toISOString(),
    sessionsCompleted: 8,
    weeklyGoal: 15,
    currentLevel: 'Beginner',
    improvement: 8,
    engagementScore: 75,
    flowMetrics: {
      challengeSkillBalance: 75,
      concentration: 78,
      clearGoals: 82,
      feedback: 80,
      control: 77,
      immersion: 76,
      timePerception: 73,
      intrinsicMotivation: 79,
      flowScore: 77,
      timeInFlow: 30,
      totalSessionTime: 60,
      averageFlowScore: 77,
      timeInFlowPercentage: 65,
      mostProductiveTimeOfDay: 'Evening',
      flowStateFrequency: 60,
      consistentFlowDays: 3
    },
    alerts: [
      {
        type: 'warning',
        message: 'Missing weekly sessions'
      },
      {
        type: 'info',
        message: 'Showing steady improvement in fluency'
      }
    ]
  }
];

// Mock instructor dashboard data
export const mockInstructorData = {
  learners: mockLearners,
  sessions: mockSessions,
  analytics: mockAnalytics
}; 