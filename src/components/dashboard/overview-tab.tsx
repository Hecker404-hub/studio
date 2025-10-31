import { StatsCards } from "./stats-cards";
import { TrafficChart } from "./traffic-chart";
import { ThreatsChart } from "./threats-chart";
import { AlertsList } from "./alerts-list";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export function OverviewTab() {
  return (
    <div className="space-y-6">
      <StatsCards />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Network Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <TrafficChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Threat Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ThreatsChart />
          </CardContent>
        </Card>
      </div>
      <AlertsList />
    </div>
  );
}
