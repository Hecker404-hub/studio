'use server';
/**
 * @fileOverview Detects anomalous network behavior using AI to identify potential cyber threats.
 *
 * - detectAnomalousNetworkBehavior - A function that initiates the network anomaly detection flow.
 * - DetectAnomalousNetworkBehaviorInput - The input type for the detectAnomalousNetworkBehavior function.
 * - DetectAnomalousNetworkBehaviorOutput - The return type for the detectAnomalousNetworkBehavior function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectAnomalousNetworkBehaviorInputSchema = z.object({
  networkTrafficData: z
    .string()
    .describe(
      'A string containing network traffic data, such as packet captures or aggregated network statistics.'
    ),
  baselineNetworkProfile: z
    .string()
    .optional()
    .describe(
      'Optional string describing the baseline network profile for comparison. If not provided, a default profile will be used.'
    ),
});

export type DetectAnomalousNetworkBehaviorInput =
  z.infer<typeof DetectAnomalousNetworkBehaviorInputSchema>;

const DetectAnomalousNetworkBehaviorOutputSchema = z.object({
  isAnomalous: z
    .boolean()
    .describe('Whether or not the network traffic is anomalous.'),
  anomalyDescription: z
    .string()
    .describe('A description of the detected anomaly, if any.'),
  confidenceScore: z
    .number()
    .describe(
      'A confidence score (0-1) indicating the certainty of the anomaly detection.'
    ),
});

export type DetectAnomalousNetworkBehaviorOutput =
  z.infer<typeof DetectAnomalousNetworkBehaviorOutputSchema>;

export async function detectAnomalousNetworkBehavior(
  input: DetectAnomalousNetworkBehaviorInput
): Promise<DetectAnomalousNetworkBehaviorOutput> {
  return detectAnomalousNetworkBehaviorFlow(input);
}

const detectAnomalousNetworkBehaviorPrompt = ai.definePrompt({
  name: 'detectAnomalousNetworkBehaviorPrompt',
  input: {schema: DetectAnomalousNetworkBehaviorInputSchema},
  output: {schema: DetectAnomalousNetworkBehaviorOutputSchema},
  prompt: `You are an AI cybersecurity expert tasked with detecting anomalous network behavior.

You are provided with network traffic data and, optionally, a baseline network profile. You must analyze the network traffic data to determine if there are any unusual patterns or deviations from the baseline profile that could indicate a potential cyber threat.

Network Traffic Data: {{{networkTrafficData}}}

Baseline Network Profile: {{{baselineNetworkProfile}}}

Based on your analysis, determine whether the network traffic is anomalous, provide a description of the anomaly (if any), and assign a confidence score (0-1) to your detection.

{{#if baselineNetworkProfile}}
  Compare the current network traffic data against the provided baseline network profile to identify deviations.
{{else}}
  Analyze the network traffic data for unusual patterns or deviations from typical network behavior.
{{/if}}

Consider factors such as:
- Unusual traffic volume or patterns
- Suspicious network connections
- Anomalous protocol usage
- Unexpected data transfers

Output your findings in JSON format:
{
  "isAnomalous": true/false,
  "anomalyDescription": "Description of the anomaly (if any)",
  "confidenceScore": 0.0-1.0
}`,
});

const detectAnomalousNetworkBehaviorFlow = ai.defineFlow(
  {
    name: 'detectAnomalousNetworkBehaviorFlow',
    inputSchema: DetectAnomalousNetworkBehaviorInputSchema,
    outputSchema: DetectAnomalousNetworkBehaviorOutputSchema,
  },
  async input => {
    const {output} = await detectAnomalousNetworkBehaviorPrompt(input);
    return output!;
  }
);
