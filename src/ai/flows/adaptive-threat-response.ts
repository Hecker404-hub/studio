'use server';

/**
 * @fileOverview This file implements an AI flow for adaptive threat response.
 *
 * The flow allows the AI to learn from past cyber threats and adapt its defense strategies automatically.
 *
 * @param {AdaptiveThreatResponseInput} input - The input data for the adaptive threat response flow.
 * @returns {Promise<AdaptiveThreatResponseOutput>} - A promise that resolves to the adaptive threat response output.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptiveThreatResponseInputSchema = z.object({
  threatDescription: z
    .string()
    .describe('A description of the cyber threat encountered.'),
  currentDefenseStrategy: z
    .string()
    .describe('The current defense strategy in place.'),
  systemLogs: z
    .string()
    .describe('System logs providing context about the threat.'),
});

export type AdaptiveThreatResponseInput = z.infer<
  typeof AdaptiveThreatResponseInputSchema
>;

const AdaptiveThreatResponseOutputSchema = z.object({
  adaptiveStrategy: z
    .string()
    .describe(
      'An updated defense strategy based on the learned threat patterns.'
    ),
  rationale: z
    .string()
    .describe(
      'The rationale behind the adaptive strategy, explaining how it improves resilience.'
    ),
  confidenceLevel: z
    .number()
    .describe(
      'A confidence level (0-1) indicating the certainty of the AI in the proposed strategy.'
    ),
});

export type AdaptiveThreatResponseOutput = z.infer<
  typeof AdaptiveThreatResponseOutputSchema
>;

export async function adaptiveThreatResponse(
  input: AdaptiveThreatResponseInput
): Promise<AdaptiveThreatResponseOutput> {
  return adaptiveThreatResponseFlow(input);
}

const adaptiveThreatResponsePrompt = ai.definePrompt({
  name: 'adaptiveThreatResponsePrompt',
  input: {schema: AdaptiveThreatResponseInputSchema},
  output: {schema: AdaptiveThreatResponseOutputSchema},
  prompt: `You are an AI cybersecurity expert tasked with analyzing cyber threats and improving defense strategies.

  Based on the description of the recent threat, the current defense strategy, and system logs, propose an updated defense strategy.

  Threat Description: {{{threatDescription}}}
  Current Defense Strategy: {{{currentDefenseStrategy}}}
  System Logs: {{{systemLogs}}}

  Consider the following when creating the adaptive strategy:
  - How can the defense strategy be improved to prevent similar attacks in the future?
  - What specific changes should be made to the security protocols or infrastructure?
  - What is the confidence level that the new adaptive strategy will improve system resilience?

  Provide a rationale for the adaptive strategy, explaining how it improves resilience and why it is better than the current strategy.  Include a confidenceLevel between 0 and 1.
  `,
});

const adaptiveThreatResponseFlow = ai.defineFlow(
  {
    name: 'adaptiveThreatResponseFlow',
    inputSchema: AdaptiveThreatResponseInputSchema,
    outputSchema: AdaptiveThreatResponseOutputSchema,
  },
  async input => {
    const {output} = await adaptiveThreatResponsePrompt(input);
    return output!;
  }
);
