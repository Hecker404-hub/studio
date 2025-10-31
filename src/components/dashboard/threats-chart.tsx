"use client";

import { Pie, PieChart, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { threat: "Malware", count: 275, fill: "var(--color-malware)" },
  { threat: "Phishing", count: 200, fill: "var(--color-phishing)" },
  { threat: "DDoS", count: 187, fill: "var(--color-ddos)" },
  { threat: "Insider Threat", count: 173, fill: "var(--color-insider)" },
  { threat: "Ransomware", count: 90, fill: "var(--color-ransomware)" },
];

const chartConfig = {
  count: {
    label: "Count",
  },
  malware: {
    label: "Malware",
    color: "hsl(var(--chart-1))",
  },
  phishing: {
    label: "Phishing",
    color: "hsl(var(--chart-2))",
  },
  ddos: {
    label: "DDoS",
    color: "hsl(var(--chart-3))",
  },
  insider: {
    label: "Insider Threat",
    color: "hsl(var(--chart-4))",
  },
  ransomware: {
    label: "Ransomware",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;

export function ThreatsChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] w-full aspect-square"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="threat" />} />
        <Pie data={chartData} dataKey="count" nameKey="threat" innerRadius={60}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="threat" />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}
