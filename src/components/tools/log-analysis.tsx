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
import { summarizeSecurityLogs } from "@/ai/flows/summarize-security-logs";
import type { SummarizeSecurityLogsOutput } from "@/ai/flows/summarize-security-logs";
import { Loader2, FileText, ShieldAlert } from "lucide-react";

const formSchema = z.object({
  logs: z.string().min(100, "Please provide a more substantial log sample for analysis."),
});

const exampleLogs = `
[2024-08-01 10:05:21] INFO: User 'j.doe' logged in successfully from 192.168.1.10.
[2024-08-01 10:15:33] WARN: Failed login attempt for user 'admin' from IP 103.55.201.8.
[2024-08-01 10:15:35] WARN: Failed login attempt for user 'admin' from IP 103.55.201.8.
[2024-08-01 10:15:38] WARN: Failed login attempt for user 'admin' from IP 103.55.201.8.
[2024-08-01 10:16:01] ERROR: User 'admin' account locked due to too many failed attempts.
[2024-08-01 11:30:00] INFO: User 's.smith' accessed confidential file '/data/project_alpha.docx'.
[2024-08-01 12:00:45] INFO: Database backup completed successfully.
[2024-08-01 14:00:05] WARN: High CPU usage detected on server 'db-01'.
`;

export function LogAnalysisTool() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] =
    useState<SummarizeSecurityLogsOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logs: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);
    startTransition(async () => {
      const response = await summarizeSecurityLogs(values);
      setResult(response);
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>NLP Security Log Analysis</CardTitle>
        <CardDescription>
          Analyze security logs and user activity through NLP to get early warnings and insights into potential security breaches.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="logs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Security Logs</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste raw security logs here..."
                      className="min-h-[250px] font-mono text-xs"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                     Provide a block of text-based logs for the AI to analyze. You can also <Button variant="link" size="sm" type="button" className="p-0 h-auto" onClick={() => form.setValue('logs', exampleLogs)}>use an example</Button>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Summarize Logs
            </Button>
          </CardFooter>
        </form>
      </Form>
      {(isPending || result) && (
        <>
          <CardHeader>
            <CardTitle>Log Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {isPending && (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <p className="text-muted-foreground">AI is reading and summarizing logs...</p>
              </div>
            )}
            {result && (
              <div className="space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                        <div className="bg-primary/10 p-3 rounded-full">
                           <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>Log Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-wrap">{result.summary}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                        <div className="bg-destructive/10 p-3 rounded-full">
                            <ShieldAlert className="h-6 w-6 text-destructive" />
                        </div>
                        <CardTitle>Potential Breaches Identified</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">{result.potentialBreaches}</p>
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
