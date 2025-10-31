import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { ShieldAlert, ShieldBan, ShieldCheck } from "lucide-react";

const alerts = [
  {
    id: "ALT001",
    severity: "Critical",
    description: "Anomalous login activity from unrecognized IP.",
    timestamp: "2 minutes ago",
    status: "New",
  },
  {
    id: "ALT002",
    severity: "High",
    description: "Potential DDoS attack detected on web-server-01.",
    timestamp: "15 minutes ago",
    status: "Investigating",
  },
  {
    id: "ALT003",
    severity: "Medium",
    description: "Unusual outbound traffic from employee workstation.",
    timestamp: "1 hour ago",
    status: "Contained",
  },
  {
    id: "ALT004",
    severity: "Low",
    description: "Multiple failed login attempts for user 'admin'.",
    timestamp: "3 hours ago",
    status: "Resolved",
  },
];

const severityVariant: { [key: string]: "destructive" | "secondary" | "default" } = {
  Critical: "destructive",
  High: "destructive",
  Medium: "secondary",
  Low: "default",
};

export function AlertsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-time Threat Alerts</CardTitle>
        <CardDescription>
          Live feed of potential threats detected by the AI system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Severity</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell>
                  <Badge variant={severityVariant[alert.severity]}>
                    {alert.severity}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {alert.description}
                </TableCell>
                <TableCell>{alert.timestamp}</TableCell>
                <TableCell>{alert.status}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm">
                    <ShieldBan className="mr-2 h-4 w-4" />
                    Isolate
                  </Button>
                  <Button variant="outline" size="sm">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Dismiss
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
