"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { AnomalyDetectionTool } from "@/components/tools/anomaly-detection";
import { AdaptiveResponseTool } from "@/components/tools/adaptive-response";
import { LogAnalysisTool } from "@/components/tools/log-analysis";
import { OverviewTab } from "./dashboard/overview-tab";
import { LayoutDashboard, GitCompareArrows, Bot, FileText, Globe } from "lucide-react";
import { ThreatMapTab } from "./dashboard/threat-map-tab";

export function DashboardContent() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-5 h-auto">
        <TabsTrigger value="overview">
          <LayoutDashboard className="mr-2" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="threat-map">
          <Globe className="mr-2" />
          Threat Map
        </TabsTrigger>
        <TabsTrigger value="anomaly-detection">
          <GitCompareArrows className="mr-2" />
          Anomaly Detection
        </TabsTrigger>
        <TabsTrigger value="adaptive-response">
          <Bot className="mr-2" />
          Adaptive Response
        </TabsTrigger>
        <TabsTrigger value="log-analysis">
          <FileText className="mr-2" />
          Log Analysis
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <OverviewTab />
      </TabsContent>
      <TabsContent value="threat-map">
        <ThreatMapTab />
      </TabsContent>
      <TabsContent value="anomaly-detection">
        <AnomalyDetectionTool />
      </TabsContent>
      <TabsContent value="adaptive-response">
        <AdaptiveResponseTool />
      </TabsContent>
      <TabsContent value="log-analysis">
        <LogAnalysisTool />
      </TabsContent>
    </Tabs>
  );
}
