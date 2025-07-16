'use server';

/**
 * @fileOverview AI assistant to suggest the best bush to harvest next.
 *
 * - harvestAssistant - A function that suggests the next best bush to harvest.
 * - HarvestAssistantInput - The input type for the harvestAssistant function.
 * - HarvestAssistantOutput - The return type for the harvestAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HarvestAssistantInputSchema = z.object({
  plots: z
    .array(
      z.object({
        bushes: z.array(
          z.object({
            color: z.enum(['blue', 'purple', 'yellow']),
            isWithered: z.boolean(),
            bonusMultiplier: z.number().optional(),
            value: z.number().optional(),
          })
        ),
      })
    )
    .describe('The current state of the garden plots, including bush colors and withered status.'),
  currentScore: z.number().describe('The player\'s current score.'),
});
export type HarvestAssistantInput = z.infer<typeof HarvestAssistantInputSchema>;

const HarvestAssistantOutputSchema = z.object({
  recommendation: z
    .string()
    .describe(
      'A recommendation for the next best bush to harvest, including reasoning for the suggestion.'
    ),
});
export type HarvestAssistantOutput = z.infer<typeof HarvestAssistantOutputSchema>;

export async function harvestAssistant(input: HarvestAssistantInput): Promise<HarvestAssistantOutput> {
  return harvestAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'harvestAssistantPrompt',
  input: {schema: HarvestAssistantInputSchema},
  output: {schema: HarvestAssistantOutputSchema},
  prompt: `You are a harvest assistant, expert in maximizing scores in the Harvest Frenzy game.

  Given the current state of the garden plots and the game rules, analyze the situation and provide a recommendation for the next best bush to harvest.
  Explain your reasoning, considering the probabilities of bonus triggers, neighboring bush effects, and the potential for maximizing the harvest total.

  Here's the current game state:
  Plots: {{plots}}
  Current Score: {{currentScore}}

  Game Rules:
  - Each plot has two bushes that can be blue, purple, or yellow.
  - Clicking a bush yields 100 points of the corresponding color, and the bush withers.
  - There is a 60% chance the neighboring bush on that plot does not wither.
  - If the neighbor survives and is a different color, there is a 50% chance its value will be doubled (stackable, e.g., x2, x4, etc.).
  - Clicking a bush gives a 50% chance to apply a x2 bonus multiplier to all other-colored bushes (on all plots) for subsequent harvests. This bonus can also stack.

  Based on this, what is your recommendation for the next harvest?`,
});

const harvestAssistantFlow = ai.defineFlow(
  {
    name: 'harvestAssistantFlow',
    inputSchema: HarvestAssistantInputSchema,
    outputSchema: HarvestAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
