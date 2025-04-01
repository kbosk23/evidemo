'use client';

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Brain, Clock, Target, TrendingUp } from "lucide-react";

interface FlowTrends {
  averageFlowScore: number;
  timeInFlowPercentage: number;
  mostProductiveTimeOfDay: string;
  challengeSkillBalance: number;
  flowStateFrequency: number;
  consistentFlowDays: number;
}

interface LearnerFlowCardProps {
  flowMetrics: FlowTrends;
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

export function LearnerFlowCard({ flowMetrics, translations }: LearnerFlowCardProps) {
  const getFlowZoneColor = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getFlowInsight = (score: number) => {
    if (score >= 80) return translations.flow.insights.highFlow;
    if (score >= 60) return translations.flow.insights.moderateFlow;
    return translations.flow.insights.lowFlow;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-500" />
          {translations.flow.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Flow Score */}
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold mb-2">{Math.round(flowMetrics.averageFlowScore)}%</div>
          <div className="text-sm text-gray-600">{getFlowInsight(flowMetrics.averageFlowScore)}</div>
        </div>

        {/* Flow Metrics */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{translations.flow.duration}</span>
              <span>{flowMetrics.timeInFlowPercentage}%</span>
            </div>
            <Progress 
              value={flowMetrics.timeInFlowPercentage} 
              className={`h-2 ${getFlowZoneColor(flowMetrics.timeInFlowPercentage)}`}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{translations.flow.frequency}</span>
              <span>{flowMetrics.flowStateFrequency}%</span>
            </div>
            <Progress 
              value={flowMetrics.flowStateFrequency} 
              className={`h-2 ${getFlowZoneColor(flowMetrics.flowStateFrequency)}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <div className="text-sm">
                <div className="font-medium">Best Time</div>
                <div className="text-gray-600">{flowMetrics.mostProductiveTimeOfDay}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-gray-500" />
              <div className="text-sm">
                <div className="font-medium">Consistent Days</div>
                <div className="text-gray-600">{flowMetrics.consistentFlowDays}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 