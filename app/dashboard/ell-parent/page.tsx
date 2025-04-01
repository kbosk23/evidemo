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
import { es, zhCN, fr } from 'date-fns/locale';
import { Progress } from "../../../components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { LanguageProvider, useLanguage } from "../../contexts/LanguageContext";
import { LanguageSelector } from "../../components/LanguageSelector";
import { FlowStateCard } from "../../../components/dashboard/FlowStateCard";
import { LearnerFlowCard } from "../../../components/dashboard/LearnerFlowCard";

interface LearnerProgress {
  id: string;
  name: string;
  lastSession: string;
  sessionsCompleted: number;
  weeklyGoal: number;
  currentLevel: string;
  improvement: number;
  engagementScore: number;
  flowMetrics: {
    challengeSkillBalance: number;
    concentration: number;
    clearGoals: number;
    feedback: number;
    control: number;
    immersion: number;
    timePerception: number;
    intrinsicMotivation: number;
    flowScore: number;
    timeInFlow: number;
    totalSessionTime: number;
    averageFlowScore: number;
    timeInFlowPercentage: number;
    mostProductiveTimeOfDay: string;
    flowStateFrequency: number;
    consistentFlowDays: number;
  };
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
  flow: {
    challengeSkillBalance: number;
    concentration: number;
    clearGoals: number;
    feedback: number;
    control: number;
    immersion: number;
    timePerception: number;
    intrinsicMotivation: number;
    flowScore: number;
    timeInFlow: number;
    totalSessionTime: number;
  };
}

interface SessionData {
  id: string;
  learnerId: string;
  learnerName: string;
  startTime: string;
  endTime: string | null;
  metrics: SessionMetrics;
}

const locales = {
  en: undefined,
  es: es,
  zh: zhCN,
  fr: fr
};

function Dashboard() {
  const { t, language } = useLanguage();
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
            `/api/dashboard/ell-parent/sessions?start=${timeRange.start.toISOString()}&end=${timeRange.end.toISOString()}`
          ),
          fetch('/api/dashboard/ell-parent/learners')
        ]);
        
        const [sessionsData, learnersData] = await Promise.all([
          sessionsResponse.json(),
          learnersResponse.json()
        ]);

        // Transform alert messages based on current language
        const localizedLearnerData = learnersData.map((learner: LearnerProgress) => ({
          ...learner,
          alerts: learner.alerts.map(alert => ({
            ...alert,
            message: (t.alerts && alert.message in t.alerts) 
              ? t.alerts[alert.message as keyof typeof t.alerts]
              : alert.message // Fallback to original message if translation not found
          }))
        }));

        setSessions(sessionsData);
        setLearners(localizedLearnerData);
      } catch (error) {
        console.error(t.errors?.fetchError || "Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange, language, t]); // Added language and t as dependencies to update translations when language changes

  if (loading) {
    return <div>{t.loading}</div>;
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

  // Calculate aggregate flow metrics
  const aggregateFlowMetrics = {
    challengeSkillBalance: filteredSessions.reduce((sum, session) => sum + session.metrics.flow.challengeSkillBalance, 0) / totalSessions,
    concentration: filteredSessions.reduce((sum, session) => sum + session.metrics.flow.concentration, 0) / totalSessions,
    clearGoals: filteredSessions.reduce((sum, session) => sum + session.metrics.flow.clearGoals, 0) / totalSessions,
    feedback: filteredSessions.reduce((sum, session) => sum + session.metrics.flow.feedback, 0) / totalSessions,
    control: filteredSessions.reduce((sum, session) => sum + session.metrics.flow.control, 0) / totalSessions,
    immersion: filteredSessions.reduce((sum, session) => sum + session.metrics.flow.immersion, 0) / totalSessions,
    timePerception: filteredSessions.reduce((sum, session) => sum + session.metrics.flow.timePerception, 0) / totalSessions,
    intrinsicMotivation: filteredSessions.reduce((sum, session) => sum + session.metrics.flow.intrinsicMotivation, 0) / totalSessions,
    flowScore: filteredSessions.reduce((sum, session) => sum + session.metrics.flow.flowScore, 0) / totalSessions,
    timeInFlow: filteredSessions.reduce((sum, session) => sum + session.metrics.flow.timeInFlow, 0),
    totalSessionTime: filteredSessions.reduce((sum, session) => sum + session.metrics.flow.totalSessionTime, 0)
  };

  // Find learners needing attention
  const learnersNeedingAttention = learners
    .filter(l => l.alerts.length > 0)
    .sort((a, b) => b.alerts.length - a.alerts.length);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Select value={selectedLearner} onValueChange={setSelectedLearner}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={t.selectStudent} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allStudents}</SelectItem>
              {learners.map(learner => (
                <SelectItem key={learner.id} value={learner.id}>
                  {learner.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard
          title={t.metrics.activeStudents}
          value={learners.length}
          icon={<Users className="h-4 w-4 text-blue-500" />}
          description={t.metrics.totalParticipating}
        />
        <MetricCard
          title={t.metrics.averageComprehension}
          value={`${Math.round(averageComprehension)}%`}
          icon={<BookOpen className="h-4 w-4 text-green-500" />}
          description={t.metrics.generalUnderstanding}
        />
        <MetricCard
          title={t.metrics.averageFluency}
          value={`${Math.round(averageFluency)}%`}
          icon={<TrendingUp className="h-4 w-4 text-purple-500" />}
          description={t.metrics.readingProficiency}
        />
        <MetricCard
          title={t.metrics.sessionsThisWeek}
          value={totalSessions}
          icon={<Calendar className="h-4 w-4 text-orange-500" />}
          description={`${completedSessions} ${t.metrics.completed}`}
        />
      </div>

      {/* Selected Learner Flow State */}
      {selectedLearner !== "all" && (
        <div className="mb-6">
          <LearnerFlowCard 
            flowMetrics={learners.find(l => l.id === selectedLearner)?.flowMetrics!}
            translations={t}
          />
        </div>
      )}

      {/* Flow State Analysis */}
      {selectedLearner === "all" && (
        <div className="mb-6">
          <FlowStateCard 
            metrics={aggregateFlowMetrics}
            translations={t.flow}
          />
        </div>
      )}

      {/* Learners Needing Attention */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Flag className="h-5 w-5 text-red-500" />
          {t.attention.title}
        </h2>
        <div className="space-y-4">
          {learnersNeedingAttention.map(learner => (
            <div key={learner.id} className="border-b last:border-0 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{learner.name}</h3>
                  <p className="text-sm text-gray-500">
                    {t.attention.lastSession}: {formatDistanceToNow(new Date(learner.lastSession), { addSuffix: true, locale: locales[language] })}
                  </p>
                </div>
                <div className="text-sm font-medium">
                  {t.attention.level}: {learner.currentLevel}
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
                  <span>{t.attention.weeklyProgress}</span>
                  <span>{learner.sessionsCompleted}/{learner.weeklyGoal} {t.attention.sessions}</span>
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
          <h2 className="text-xl font-semibold mb-4">{t.recentSessions.title}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">{t.recentSessions.student}</th>
                  <th className="text-left py-3 px-4">{t.recentSessions.date}</th>
                  <th className="text-left py-3 px-4">{t.recentSessions.duration}</th>
                  <th className="text-left py-3 px-4">{t.recentSessions.comprehension}</th>
                  <th className="text-left py-3 px-4">{t.recentSessions.fluency}</th>
                  <th className="text-left py-3 px-4">{t.recentSessions.engagement}</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.map((session) => (
                  <tr key={session.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">
                      {session.learnerName}
                    </td>
                    <td className="py-3 px-4">
                      {format(new Date(session.startTime), "PPp", { locale: locales[language] })}
                    </td>
                    <td className="py-3 px-4">
                      {session.endTime
                        ? formatDistanceToNow(new Date(session.metrics.duration || 0), { locale: locales[language] })
                        : t.recentSessions.ongoing}
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

export default function ELLParentDashboard() {
  return (
    <LanguageProvider>
      <Dashboard />
    </LanguageProvider>
  );
} 