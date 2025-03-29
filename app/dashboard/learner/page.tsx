"use client";

import { useEffect, useState } from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import {
  BookOpen,
  Brain,
  Clock,
  MessageCircle,
  Star,
  TrendingUp,
  Activity,
} from "lucide-react";
import { format, subDays } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LearnerDashboardData {
  overview: {
    totalSessions: number;
    totalDuration: number;
    averageScore: number;
    totalInteractions: number;
  };
  progress: {
    comprehension: number;
    fluency: number;
    engagement: number;
    weeklyGoal: number;
    sessionsCompleted: number;
  };
  recentSessions: Array<{
    id: string;
    date: string;
    duration: number;
    score: number;
    interactions: number;
  }>;
  skillProgress: Array<{
    skill: string;
    progress: number;
    level: string;
  }>;
}

export default function LearnerDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<LearnerDashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard/learner");
        const dashboardData = await response.json();
        setData(dashboardData);
      } catch (error) {
        console.error("Failed to fetch learner dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Learning Progress</h1>

      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard
          title="Total Sessions"
          value={data.overview.totalSessions}
          icon={<Activity className="h-4 w-4 text-blue-500" />}
          description="Sessions completed"
        />
        <MetricCard
          title="Learning Time"
          value={`${Math.round(data.overview.totalDuration / 60)}min`}
          icon={<Clock className="h-4 w-4 text-green-500" />}
          description="Total time spent learning"
        />
        <MetricCard
          title="Average Score"
          value={`${data.overview.averageScore}%`}
          icon={<Star className="h-4 w-4 text-yellow-500" />}
          description="Overall performance"
        />
        <MetricCard
          title="Total Interactions"
          value={data.overview.totalInteractions}
          icon={<MessageCircle className="h-4 w-4 text-purple-500" />}
          description="Messages exchanged"
        />
      </div>

      {/* Progress Section */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-500" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Comprehension</span>
                <span>{data.progress.comprehension}%</span>
              </div>
              <Progress value={data.progress.comprehension} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Fluency</span>
                <span>{data.progress.fluency}%</span>
              </div>
              <Progress value={data.progress.fluency} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Engagement</span>
                <span>{data.progress.engagement}%</span>
              </div>
              <Progress value={data.progress.engagement} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Weekly Goal</span>
                <span>{data.progress.sessionsCompleted}/{data.progress.weeklyGoal} sessions</span>
              </div>
              <Progress 
                value={(data.progress.sessionsCompleted / data.progress.weeklyGoal) * 100} 
                className="h-2" 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-500" />
              Skill Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.skillProgress.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{skill.skill}</span>
                  <span>Level {skill.level}</span>
                </div>
                <Progress value={skill.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            Recent Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Duration</th>
                  <th className="text-left py-3 px-4">Score</th>
                  <th className="text-left py-3 px-4">Interactions</th>
                </tr>
              </thead>
              <tbody>
                {data.recentSessions.map((session) => (
                  <tr key={session.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {format(new Date(session.date), "PPp")}
                    </td>
                    <td className="py-3 px-4">
                      {Math.round(session.duration / 60)}min
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Progress value={session.score} className="w-24" />
                        <span className="text-sm">{session.score}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{session.interactions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 