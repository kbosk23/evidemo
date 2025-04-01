'use client';

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Brain, Clock, Target, Zap } from "lucide-react";

interface FlowMetrics {
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
}

interface FlowStateCardProps {
  metrics: FlowMetrics;
  translations: {
    title: string;
    challengeSkillBalance: string;
    concentration: string;
    clearGoals: string;
    feedback: string;
    control: string;
    immersion: string;
    timePerception: string;
    intrinsicMotivation: string;
    flowScore: string;
    optimal: string;
    suboptimal: string;
    duration: string;
  };
}

export function FlowStateCard({ metrics, translations }: FlowStateCardProps) {
  const getFlowZoneColor = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const flowPercentage = (metrics.timeInFlow / metrics.totalSessionTime) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-500" />
          {translations.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Flow Score */}
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold mb-2">{Math.round(metrics.flowScore)}%</div>
          <div className="text-sm text-gray-600">{translations.flowScore}</div>
        </div>

        {/* Flow State Duration */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{translations.duration}</span>
            <span>{Math.round(flowPercentage)}%</span>
          </div>
          <Progress value={flowPercentage} className="h-2" />
        </div>

        {/* Flow Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{translations.challengeSkillBalance}</span>
              <span>{metrics.challengeSkillBalance}%</span>
            </div>
            <Progress 
              value={metrics.challengeSkillBalance} 
              className={`h-2 ${getFlowZoneColor(metrics.challengeSkillBalance)}`} 
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{translations.concentration}</span>
              <span>{metrics.concentration}%</span>
            </div>
            <Progress 
              value={metrics.concentration} 
              className={`h-2 ${getFlowZoneColor(metrics.concentration)}`} 
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{translations.clearGoals}</span>
              <span>{metrics.clearGoals}%</span>
            </div>
            <Progress 
              value={metrics.clearGoals} 
              className={`h-2 ${getFlowZoneColor(metrics.clearGoals)}`} 
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{translations.feedback}</span>
              <span>{metrics.feedback}%</span>
            </div>
            <Progress 
              value={metrics.feedback} 
              className={`h-2 ${getFlowZoneColor(metrics.feedback)}`} 
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{translations.control}</span>
              <span>{metrics.control}%</span>
            </div>
            <Progress 
              value={metrics.control} 
              className={`h-2 ${getFlowZoneColor(metrics.control)}`} 
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{translations.immersion}</span>
              <span>{metrics.immersion}%</span>
            </div>
            <Progress 
              value={metrics.immersion} 
              className={`h-2 ${getFlowZoneColor(metrics.immersion)}`} 
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{translations.timePerception}</span>
              <span>{metrics.timePerception}%</span>
            </div>
            <Progress 
              value={metrics.timePerception} 
              className={`h-2 ${getFlowZoneColor(metrics.timePerception)}`} 
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{translations.intrinsicMotivation}</span>
              <span>{metrics.intrinsicMotivation}%</span>
            </div>
            <Progress 
              value={metrics.intrinsicMotivation} 
              className={`h-2 ${getFlowZoneColor(metrics.intrinsicMotivation)}`} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 