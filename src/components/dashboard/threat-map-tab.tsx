import { ThreatMap } from "./threat-map";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ThreatMapTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Global Threat Intelligence Map</CardTitle>
          <CardDescription>
            A real-time visualization of cyber threats originating from around the globe.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ThreatMap />
          <div className="flex justify-end items-center gap-4 mt-4 text-sm">
            <span className="font-semibold">Legend:</span>
            <div className="flex items-center gap-2">
              <Badge variant="destructive">Critical</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-500 hover:bg-yellow-500/80">High</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500 hover:bg-blue-500/80">Medium</Badge>
            </div>
             <div className="flex items-center gap-2">
              <Badge className="bg-green-500 hover:bg-green-500/80">Low</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
