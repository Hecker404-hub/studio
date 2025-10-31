"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { time: "00:00", normal: 4000, anomaly: 2400 },
  { time: "02:00", normal: 3000, anomaly: 1398 },
  { time: "04:00", normal: 2000, anomaly: 9800 },
  { time: "06:00", normal: 2780, anomaly: 3908 },
  { time: "08:00", normal: 1890, anomaly: 4800 },
  { time: "10:00", normal: 2390, anomaly: 3800 },
  { time: "12:00", normal: 3490, anomaly: 4300 },
  { time: "14:00", normal: 3520, anomaly: 4200 },
  { time: "16:00", normal: 2980, anomaly: 3500 },
  { time: "18:00", normal: 8200, anomaly: 12000 },
  { time: "20:00", normal: 4100, anomaly: 3900 },
  { time: "22:00", normal: 3800, anomaly: 3600 },
];

const chartConfig = {
  normal: {
    label: "Normal Traffic",
    color: "hsl(var(--chart-1))",
  },
  anomaly: {
    label: "Anomalous Traffic",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;

export function TrafficChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 20, left: -10, bottom: 0 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `${value / 1000}k`}
        />
        <Tooltip content={<ChartTooltipContent />} />
        <Line
          dataKey="normal"
          type="monotone"
          stroke="var(--color-normal)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="anomaly"
          type="monotone"
          stroke="var(--color-anomaly)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
