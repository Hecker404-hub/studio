"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import { detectAnomalousNetworkBehavior } from "@/ai/flows/detect-anomalous-network-behavior";
import type { DetectAnomalousNetworkBehaviorOutput } from "@/ai/flows/detect-anomalous-network-behavior";
import { Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";

const formSchema = z.object({
  networkTrafficData: z
    .string()
    .min(50, "Please provide more detailed network traffic data."),
  baselineNetworkProfile: z.string().optional(),
});

const exampleTrafficData = `
Frame 1: 62 bytes on wire (496 bits), 62 bytes captured (496 bits)
Ethernet II, Src: PcsCompu_a1:b2:c3 (00:0d:3f:a1:b2:c3), Dst: Broadcast (ff:ff:ff:ff:ff:ff)
ARP, 2, 1, 8, 6, 2, PcsCompu_a1:b2:c3 (00:0d:3f:a1:b2:c3), 192.168.1.101, 00:00:00:00:00:00, 192.168.1.1
Frame 2: 98 bytes on wire (784 bits), 98 bytes captured (784 bits)
Ethernet II, Src: 10:dd:b1:a0:b0:c0, Dst: PcsCompu_a1:b2:c3 (00:0d:3f:a1:b2:c3)
Internet Protocol Version 4, Src: 192.168.1.1, Dst: 192.168.1.101
TCP, 51303 → 1025, [SYN] Seq=0 Win=8192 Len=0 MSS=1460 WS=256 SACK_PERM=1
`;

export function AnomalyDetectionTool() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] =
    useState<DetectAnomalousNetworkBehaviorOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      networkTrafficData: "",
      baselineNetworkProfile: "Standard enterprise network profile, low outbound traffic during non-business hours.",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);
    startTransition(async () => {
      const response = await detectAnomalousNetworkBehavior(values);
      setResult(response);
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Anomaly Detection</CardTitle>
        <CardDescription>
          Analyze network traffic data to identify unusual patterns or deviations from the baseline that could indicate a threat.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="networkTrafficData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Network Traffic Data</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste raw network traffic logs here..."
                      className="min-h-[200px] font-mono text-xs"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a sample of network data (e.g., packet captures, flow data). You can also <Button variant="link" size="sm" type="button" className="p-0 h-auto" onClick={() => form.setValue('networkTrafficData', exampleTrafficData)}>use an example</Button>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="baselineNetworkProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Baseline Network Profile (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe the expected network behavior..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide context on what is considered 'normal' traffic for this network.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Analyze Traffic
            </Button>
          </CardFooter>
        </form>
      </Form>
      {(isPending || result) && (
        <>
          <CardHeader>
            <CardTitle>Analysis Result</CardTitle>
          </CardHeader>
          <CardContent>
            {isPending && (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <p className="text-muted-foreground">AI is analyzing the network data...</p>
              </div>
            )}
            {result && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {result.isAnomalous ? (
                    <ShieldAlert className="h-10 w-10 text-destructive" />
                  ) : (
                    <ShieldCheck className="h-10 w-10 text-green-500" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">
                      {result.isAnomalous
                        ? "Anomalous Behavior Detected"
                        : "Normal Behavior"}
                    </h3>
                    <Badge variant={result.isAnomalous ? "destructive" : "secondary"}>
                      {result.isAnomalous ? "Threat" : "No Threat"}
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground">{result.anomalyDescription}</p>
                <div>
                  <FormLabel>Confidence Score</FormLabel>
                  <div className="flex items-center gap-2">
                    <Progress value={result.confidenceScore * 100} className="w-full" />
                    <span className="font-mono text-sm">
                      {(result.confidenceScore * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
}
