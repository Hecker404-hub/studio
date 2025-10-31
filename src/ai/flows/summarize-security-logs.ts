'use server';

/**
 * @fileOverview Summarizes security logs using NLP to identify potential security breaches.
 *
 * - summarizeSecurityLogs - A function that summarizes security logs.
 * - SummarizeSecurityLogsInput - The input type for the summarizeSecurityLogs function.
 * - SummarizeSecurityLogsOutput - The return type for the summarizeSecurityLogs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSecurityLogsInputSchema = z.object({
  logs: z
    .string()
    .describe("Security logs to analyze for potential breaches."),
});

export type SummarizeSecurityLogsInput = z.infer<typeof SummarizeSecurityLogsInputSchema>;

const SummarizeSecurityLogsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the security logs.'),
  potentialBreaches: z
    .string()
    .describe(
      'Identified potential security breaches and their severity levels.'
    ),
});

export type SummarizeSecurityLogsOutput = z.infer<typeof SummarizeSecurityLogsOutputSchema>;

export async function summarizeSecurityLogs(
  input: SummarizeSecurityLogsInput
): Promise<SummarizeSecurityLogsOutput> {
  return summarizeSecurityLogsFlow(input);
}

const summarizeSecurityLogsPrompt = ai.definePrompt({
  name: 'summarizeSecurityLogsPrompt',
  input: {schema: SummarizeSecurityLogsInputSchema},
  output: {schema: SummarizeSecurityLogsOutputSchema},
  prompt: `You are a security analyst tasked with summarizing security logs to identify potential security breaches.
Analyze the following logs and provide a concise summary of the overall security status.
Identify any potential breaches, their severity levels, and any recommended actions.

Security Logs:
{{logs}}

Summary:
Potential Breaches: `,
});

const summarizeSecurityLogsFlow = ai.defineFlow(
  {
    name: 'summarizeSecurityLogsFlow',
    inputSchema: SummarizeSecurityLogsInputSchema,
    outputSchema: SummarizeSecurityLogsOutputSchema,
  },
  async input => {
    const {output} = await summarizeSecurityLogsPrompt(input);
    return output!;
  }
);
