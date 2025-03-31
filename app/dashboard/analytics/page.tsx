"use client";

import { useEffect, useState } from "react";
import { MetricCard } from "../../../components/dashboard/MetricCard";
import {
  BarChart,
  LineChart,
  PieChart,
  Activity,
  TrendingUp,
  Users,
  Clock,
  Calendar,
  BookOpen,
  MessageCircle,
  Brain,
} from "lucide-react";
import { format, subDays, eachDayOfInterval } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Progress } from "../../../components/ui/progress";
import { FlowAnalytics } from '../../../components/dashboard/FlowAnalytics';
import { useLanguage } from '../../contexts/LanguageContext';
import { LanguageSelector } from '../../components/LanguageSelector';
import { LanguageProvider } from '../../contexts/LanguageContext';

interface AnalyticsData {
  timeRange: {
    start: string;
    end: string;
  };
  overview: {
    totalSessions: number;
    totalLearners: number;
    averageSessionDuration: number;
    totalInteractions: number;
  };
  learningMetrics: {
    averageComprehension: number;
    averageFluency: number;
    averageEngagement: number;
    improvementRate: number;
  };
  sessionDistribution: {
    date: string;
    count: number;
  }[];
  comprehensionTrends: {
    date: string;
    value: number;
  }[];
  fluencyTrends: {
    date: string;
    value: number;
  }[];
  topChallenges: {
    category: string;
    count: number;
    percentage: number;
  }[];
  learnerProgress: {
    category: string;
    count: number;
  }[];
}

function AnalyticsDashboardContent() {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState("7d");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [flowData, setFlowData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const end = new Date();
        const start = subDays(end, timeRange === "7d" ? 7 : 30);
        
        const response = await fetch(
          `/api/dashboard/analytics?start=${start.toISOString()}&end=${end.toISOString()}`
        );
        const analyticsData = await response.json();
        setData(analyticsData);
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  useEffect(() => {
    const fetchFlowData = async () => {
      try {
        const response = await fetch('/api/analytics/flow');
        const data = await response.json();
        setFlowData(data);
      } catch (error) {
        console.error('Error fetching flow analytics:', error);
      }
    };

    fetchFlowData();
  }, []);

  if (loading || !data) {
    return <div className="flex items-center justify-center min-h-screen">{t.loading}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
        <LanguageSelector />
      </div>

      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard
          title="Total Sessions"
          value={data.overview.totalSessions}
          icon={<Calendar className="h-4 w-4 text-blue-500" />}
          description="Sessions conducted"
        />
        <MetricCard
          title="Active Learners"
          value={data.overview.totalLearners}
          icon={<Users className="h-4 w-4 text-green-500" />}
          description="Unique learners"
        />
        <MetricCard
          title="Avg. Session Duration"
          value={`${Math.round(data.overview.averageSessionDuration / 60)}min`}
          icon={<Clock className="h-4 w-4 text-purple-500" />}
          description="Time per session"
        />
        <MetricCard
          title="Total Interactions"
          value={data.overview.totalInteractions.toLocaleString()}
          icon={<MessageCircle className="h-4 w-4 text-orange-500" />}
          description="Messages exchanged"
        />
      </div>

      {/* Learning Progress */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            Learning Metrics
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Comprehension</span>
                <span>{Math.round(data.learningMetrics.averageComprehension)}%</span>
              </div>
              <Progress
                value={data.learningMetrics.averageComprehension}
                className="h-2"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Fluency</span>
                <span>{Math.round(data.learningMetrics.averageFluency)}%</span>
              </div>
              <Progress
                value={data.learningMetrics.averageFluency}
                className="h-2"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Engagement</span>
                <span>{Math.round(data.learningMetrics.averageEngagement)}%</span>
              </div>
              <Progress
                value={data.learningMetrics.averageEngagement}
                className="h-2"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Improvement Rate</span>
                <span>{Math.round(data.learningMetrics.improvementRate)}%</span>
              </div>
              <Progress
                value={data.learningMetrics.improvementRate}
                className="h-2"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-500" />
            Top Challenges
          </h2>
          <div className="space-y-4">
            {data.topChallenges.map((challenge, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{challenge.category}</span>
                  <span>{challenge.count} instances</span>
                </div>
                <Progress value={challenge.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trends */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <BarChart className="h-5 w-5 text-purple-500" />
            Session Distribution
          </h2>
          <div className="h-80">
            <div className="relative h-full">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-gray-500">
                {[35, 28, 21, 14, 7, 0].map((value) => (
                  <div key={value} className="relative h-0">
                    <span className="absolute -translate-y-1/2 -translate-x-full pr-2">{value}</span>
                    <div className="absolute left-2 right-0 border-b border-gray-100" />
                  </div>
                ))}
              </div>
              
              {/* Chart area */}
              <div className="relative ml-12 h-full pb-8">
                {/* Grid lines */}
                <div className="absolute inset-0 grid grid-cols-1 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="border-b border-gray-100" />
                  ))}
                </div>
                
                {/* Bars */}
                <div className="relative h-full flex">
                  {data.sessionDistribution.map((day, index) => {
                    const percentage = (day.count / 35) * 100;
                    return (
                      <div key={index} className="flex-1 flex items-end px-2 group">
                        <div className="relative w-full h-full">
                          <div
                            className="absolute bottom-0 w-full bg-purple-500 hover:bg-purple-600 transition-colors duration-200"
                            style={{
                              height: `${percentage}%`
                            }}
                          />
                          {/* X-axis label */}
                          <div className="absolute w-full text-center top-full mt-2">
                            <span className="text-xs text-gray-600">
                              {format(new Date(day.date), "MMM d")}
                            </span>
                          </div>
                          {/* Tooltip */}
                          <div className="absolute w-full -top-7 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="relative left-1/2 -translate-x-1/2 inline-block bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                              {day.count} sessions
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <LineChart className="h-5 w-5 text-blue-500" />
            Performance Trends
          </h2>
          <div className="h-80">
            <div className="relative h-full">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-gray-500">
                {[90, 85, 80, 75, 70].map((value) => (
                  <div key={value} className="relative h-0">
                    <span className="absolute -translate-y-1/2 -translate-x-full pr-2">{value}%</span>
                    <div className="absolute left-2 right-0 border-b border-gray-100" />
                  </div>
                ))}
              </div>

              {/* Data points */}
              <div className="ml-12 h-full relative pb-8">
                <div className="absolute inset-0 flex justify-between" style={{ height: 'calc(100% - 2rem)' }}>
                  {data.comprehensionTrends.map((point, index) => (
                    <div key={`point-${index}`} className="relative flex-1">
                      {/* Comprehension point */}
                      <div
                        className="absolute w-3 h-3 bg-blue-500 rounded-full -ml-1.5 cursor-pointer group"
                        style={{
                          top: `${((90 - point.value) / 20) * 100}%`,
                        }}
                      >
                        <div className="absolute inset-x-0 -top-7 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs">
                            {Math.round(point.value)}%
                          </span>
                        </div>
                      </div>
                      
                      {/* Fluency point */}
                      <div
                        className="absolute w-3 h-3 bg-green-500 rounded-full -ml-1.5 cursor-pointer group"
                        style={{
                          top: `${((90 - data.fluencyTrends[index].value) / 20) * 100}%`,
                        }}
                      >
                        <div className="absolute inset-x-0 -top-7 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs">
                            {Math.round(data.fluencyTrends[index].value)}%
                          </span>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform translate-y-full mt-2 text-xs text-gray-600">
                        {format(new Date(point.date), "MMM d")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learner Progress Distribution */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <PieChart className="h-5 w-5 text-orange-500" />
          Learner Progress Distribution
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.learnerProgress.map((category, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4 text-center"
            >
              <div className="text-2xl font-bold mb-1">{category.count}</div>
              <div className="text-sm text-gray-600">{category.category}</div>
            </div>
          ))}
        </div>
      </div>

      {flowData && (
        <FlowAnalytics 
          flowData={flowData}
          translations={t}
        />
      )}
    </div>
  );
}

export default function AnalyticsDashboard() {
  return (
    <LanguageProvider>
      <AnalyticsDashboardContent />
    </LanguageProvider>
  );
} 