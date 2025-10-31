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
import { adaptiveThreatResponse } from "@/ai/flows/adaptive-threat-response";
import type { AdaptiveThreatResponseOutput } from "@/ai/flows/adaptive-threat-response";
import { Loader2, Wand2, Lightbulb } from "lucide-react";

const formSchema = z.object({
  threatDescription: z
    .string()
    .min(20, "Please provide a more detailed threat description."),
  currentDefenseStrategy: z
    .string()
    .min(20, "Please describe the current defense strategy in more detail."),
  systemLogs: z.string().optional(),
});

export function AdaptiveResponseTool() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] =
    useState<AdaptiveThreatResponseOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      threatDescription: "Zero-day exploit targeting Apache Struts. Attacker gained initial access via RCE, attempting lateral movement.",
      currentDefenseStrategy: "Standard perimeter firewall, endpoint detection and response (EDR) on all servers, daily log reviews.",
      systemLogs: "2024-08-01 14:30:15 - WARN: Unusual process spawned from java process on web-server-03. cmd: /bin/bash -c '...'...",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);
    startTransition(async () => {
      const response = await adaptiveThreatResponse(values);
      setResult(response);
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Adaptive Defense</CardTitle>
        <CardDescription>
          Let the AI learn from past threats and automatically adapt its defense strategies to improve resilience.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="threatDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Threat Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Zero-day exploit targeting..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentDefenseStrategy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Defense Strategy</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Standard perimeter firewall, EDR..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="systemLogs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relevant System Logs (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste any relevant log entries here..."
                      className="font-mono text-xs"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Provide log snippets that give context to the threat.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Adaptive Strategy
            </Button>
          </CardFooter>
        </form>
      </Form>
      {(isPending || result) && (
        <>
          <CardHeader>
            <CardTitle>AI-Generated Defense Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            {isPending && (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <p className="text-muted-foreground">AI is adapting the defense strategy...</p>
              </div>
            )}
            {result && (
              <div className="space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                        <div className="bg-primary/10 p-3 rounded-full">
                           <Wand2 className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>New Adaptive Strategy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-wrap">{result.adaptiveStrategy}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <Lightbulb className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>Rationale</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">{result.rationale}</p>
                    </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
}
