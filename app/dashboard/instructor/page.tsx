"use client";

import { useEffect, useState } from "react";
import { MetricCard } from "../../../components/dashboard/MetricCard";
import {
  Calendar,
  Clock,
  MessageCircle,
  Users,
  Flag,
  AlertTriangle,
  TrendingUp,
  Award,
  BookOpen,
} from "lucide-react";
import { formatDistanceToNow, format, subDays } from "date-fns";
import { Progress } from "../../../components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

interface LearnerProgress {
  id: string;
  name: string;
  lastSession: string;
  sessionsCompleted: number;
  weeklyGoal: number;
  currentLevel: string;
  improvement: number;
  engagementScore: number;
  alerts: Array<{
    type: 'warning' | 'info';
    message: string;
  }>;
}

interface SessionMetrics {
  duration: number | null;
  totalMessages: number;
  learnerMessages: number;
  tutorMessages: number;
  averageResponseTime: number | null;
  comprehensionScore: number;
  fluencyScore: number;
}

interface SessionData {
  id: string;
  learnerId: string;
  learnerName: string;
  startTime: string;
  endTime: string | null;
  metrics: SessionMetrics;
}

export default function InstructorDashboard() {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [learners, setLearners] = useState<LearnerProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState({
    start: subDays(new Date(), 7),
    end: new Date(),
  });
  const [selectedLearner, setSelectedLearner] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sessionsResponse, learnersResponse] = await Promise.all([
          fetch(
            `/api/dashboard/instructor/sessions?start=${timeRange.start.toISOString()}&end=${timeRange.end.toISOString()}`
          ),
          fetch('/api/dashboard/instructor/learners')
        ]);
        
        const [sessionsData, learnersData] = await Promise.all([
          sessionsResponse.json(),
          learnersResponse.json()
        ]);

        setSessions(sessionsData);
        setLearners(learnersData);
      } catch (error) {
        console.error("Failed to fetch instructor dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredSessions = selectedLearner === "all"
    ? sessions
    : sessions.filter(s => s.learnerId === selectedLearner);

  // Calculate aggregate metrics
  const totalSessions = filteredSessions.length;
  const completedSessions = filteredSessions.filter(s => s.endTime).length;
  const averageComprehension = filteredSessions.reduce(
    (sum, session) => sum + session.metrics.comprehensionScore,
    0
  ) / totalSessions;
  const averageFluency = filteredSessions.reduce(
    (sum, session) => sum + session.metrics.fluencyScore,
    0
  ) / totalSessions;

  // Find learners needing attention
  const learnersNeedingAttention = learners
    .filter(l => l.alerts.length > 0)
    .sort((a, b) => b.alerts.length - a.alerts.length);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
        <Select value={selectedLearner} onValueChange={setSelectedLearner}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a learner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Learners</SelectItem>
            {learners.map(learner => (
              <SelectItem key={learner.id} value={learner.id}>
                {learner.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard
          title="Active Learners"
          value={learners.length}
          icon={<Users className="h-4 w-4 text-blue-500" />}
          description="Total learners engaged"
        />
        <MetricCard
          title="Avg. Comprehension"
          value={`${Math.round(averageComprehension)}%`}
          icon={<BookOpen className="h-4 w-4 text-green-500" />}
          description="Overall understanding"
        />
        <MetricCard
          title="Avg. Fluency"
          value={`${Math.round(averageFluency)}%`}
          icon={<TrendingUp className="h-4 w-4 text-purple-500" />}
          description="Reading proficiency"
        />
        <MetricCard
          title="Sessions This Week"
          value={totalSessions}
          icon={<Calendar className="h-4 w-4 text-orange-500" />}
          description={`${completedSessions} completed`}
        />
      </div>

      {/* Learners Needing Attention */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Flag className="h-5 w-5 text-red-500" />
          Learners Needing Attention
        </h2>
        <div className="space-y-4">
          {learnersNeedingAttention.map(learner => (
            <div key={learner.id} className="border-b last:border-0 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{learner.name}</h3>
                  <p className="text-sm text-gray-500">
                    Last session: {formatDistanceToNow(new Date(learner.lastSession), { addSuffix: true })}
                  </p>
                </div>
                <div className="text-sm font-medium">
                  Level: {learner.currentLevel}
                </div>
              </div>
              <div className="space-y-2">
                {learner.alerts.map((alert, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 text-sm ${
                      alert.type === 'warning' ? 'text-red-600' : 'text-blue-600'
                    }`}
                  >
                    {alert.type === 'warning' ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : (
                      <Flag className="h-4 w-4" />
                    )}
                    {alert.message}
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Weekly Progress</span>
                  <span>{learner.sessionsCompleted}/{learner.weeklyGoal} sessions</span>
                </div>
                <Progress
                  value={(learner.sessionsCompleted / learner.weeklyGoal) * 100}
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Sessions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Learner</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Duration</th>
                  <th className="text-left py-3 px-4">Comprehension</th>
                  <th className="text-left py-3 px-4">Fluency</th>
                  <th className="text-left py-3 px-4">Engagement</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.map((session) => (
                  <tr key={session.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">
                      {session.learnerName}
                    </td>
                    <td className="py-3 px-4">
                      {format(new Date(session.startTime), "PPp")}
                    </td>
                    <td className="py-3 px-4">
                      {session.endTime
                        ? formatDistanceToNow(new Date(session.metrics.duration || 0))
                        : "Ongoing"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Progress
                          value={session.metrics.comprehensionScore}
                          className="w-24"
                        />
                        <span className="text-sm">
                          {Math.round(session.metrics.comprehensionScore)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Progress
                          value={session.metrics.fluencyScore}
                          className="w-24"
                        />
                        <span className="text-sm">
                          {Math.round(session.metrics.fluencyScore)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Progress
                          value={(session.metrics.learnerMessages / session.metrics.totalMessages) * 100}
                          className="w-24"
                        />
                        <span className="text-sm">
                          {Math.round((session.metrics.learnerMessages / session.metrics.totalMessages) * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 