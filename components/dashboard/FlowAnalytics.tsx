'use client';

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Brain, Clock, Target, TrendingUp, Users, Calendar, BarChart } from "lucide-react";

interface FlowAnalyticsProps {
  flowData: {
    dailyAverages: {
      date: string;
      averageFlowScore: number;
      timeInFlow: number;
      totalTime: number;
      studentsInFlow: number;
      totalStudents: number;
    }[];
    topPerformers: {
      name: string;
      averageFlowScore: number;
      consistentDays: number;
      preferredTime: string;
    }[];
    overallMetrics: {
      averageFlowScore: number;
      totalTimeInFlow: number;
      totalSessionTime: number;
      studentsAchievingFlow: number;
      totalStudents: number;
      averageFlowDuration: number;
    };
    flowDistribution: {
      optimal: number;
      moderate: number;
      needsImprovement: number;
    };
  };
  translations: {
    flow: {
      title: string;
      optimal: string;
      suboptimal: string;
      duration: string;
      frequency: string;
      insights: {
        highFlow: string;
        moderateFlow: string;
        lowFlow: string;
        challengeTooHigh: string;
        challengeTooLow: string;
      };
    };
  };
}

export function FlowAnalytics({ flowData, translations }: FlowAnalyticsProps) {
  const getFlowZoneColor = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const formatPercentage = (value: number) => `${Math.round(value)}%`;
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Overall Flow State Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Flow Score</CardTitle>
            <Brain className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(flowData.overallMetrics.averageFlowScore)}</div>
            <Progress 
              value={flowData.overallMetrics.averageFlowScore} 
              className={`h-2 mt-2 ${getFlowZoneColor(flowData.overallMetrics.averageFlowScore)}`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students in Flow</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {flowData.overallMetrics.studentsAchievingFlow}/{flowData.overallMetrics.totalStudents}
            </div>
            <Progress 
              value={(flowData.overallMetrics.studentsAchievingFlow / flowData.overallMetrics.totalStudents) * 100} 
              className="h-2 mt-2 bg-green-500"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time in Flow</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatTime(flowData.overallMetrics.averageFlowDuration)}
            </div>
            <p className="text-xs text-gray-500 mt-1">Average per session</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flow Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPercentage(flowData.overallMetrics.totalTimeInFlow / flowData.overallMetrics.totalSessionTime * 100)}
            </div>
            <p className="text-xs text-gray-500 mt-1">Of total learning time</p>
          </CardContent>
        </Card>
      </div>

      {/* Flow Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-blue-500" />
            Flow State Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{translations.flow.optimal}</span>
              <span>{formatPercentage(flowData.flowDistribution.optimal)}</span>
            </div>
            <Progress value={flowData.flowDistribution.optimal} className="h-2 bg-green-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Moderate Flow</span>
              <span>{formatPercentage(flowData.flowDistribution.moderate)}</span>
            </div>
            <Progress value={flowData.flowDistribution.moderate} className="h-2 bg-yellow-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{translations.flow.suboptimal}</span>
              <span>{formatPercentage(flowData.flowDistribution.needsImprovement)}</span>
            </div>
            <Progress value={flowData.flowDistribution.needsImprovement} className="h-2 bg-red-500" />
          </div>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-500" />
            Top Flow Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {flowData.topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                <div>
                  <div className="font-medium">{performer.name}</div>
                  <div className="text-sm text-gray-500">
                    {performer.consistentDays} days consistent • {performer.preferredTime}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium">
                    {formatPercentage(performer.averageFlowScore)}
                  </div>
                  <Progress 
                    value={performer.averageFlowScore} 
                    className={`w-24 h-2 ${getFlowZoneColor(performer.averageFlowScore)}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-500" />
            Flow State Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {flowData.dailyAverages.map((day, index) => (
              <div key={index} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                <div>
                  <div className="font-medium">{new Date(day.date).toLocaleDateString()}</div>
                  <div className="text-sm text-gray-500">
                    {formatPercentage(day.studentsInFlow / day.totalStudents * 100)} students in flow
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium">
                    {formatPercentage(day.averageFlowScore)}
                  </div>
                  <Progress 
                    value={day.averageFlowScore} 
                    className={`w-24 h-2 ${getFlowZoneColor(day.averageFlowScore)}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 