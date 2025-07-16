"use client";

import { useState } from 'react';
import { Bot, Sparkles, Clipboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Plot as GamePlot, LogEntry } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from './ui/textarea';

interface AiAssistantProps {
  plots: GamePlot[];
  currentScore: number;
  logs: LogEntry[];
}

function formatPlotsForPrompt(plots: GamePlot[]): string {
    return plots.map((p, i) => {
      const bushes = p.bushes.map(b => 
        `${b.color} (withered: ${b.isWithered}, bonus: x${b.bonusMultiplier}, value: ${b.value})`
      ).join(', ');
      return `  Plot ${i + 1}: [${bushes}]`;
    }).join('\n');
}

function formatLogsForPrompt(logs: LogEntry[]): string {
    return [...logs].reverse().map(log => `[${log.timestamp.toLocaleTimeString()}] ${log.message}`).join('\n');
}

export default function AiAssistant({ plots, currentScore, logs }: AiAssistantProps) {
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const { toast } = useToast();

  const generatePrompt = () => {
    const plotsState = formatPlotsForPrompt(plots);
    const logsHistory = formatLogsForPrompt(logs);
    const prompt = `You are a harvest assistant, expert in maximizing scores in the Harvest Frenzy game.

Given the current state of the garden plots, game history, and the game rules, analyze the situation and provide a recommendation for the next best bush to harvest. Explain your reasoning, considering the probabilities of bonus triggers, neighboring bush effects, and the potential for maximizing the harvest total.

Here's the current game state:
Plots:
${plotsState}
Current Score: ${currentScore}

Game History (from oldest to newest):
${logsHistory}

Game Rules:
- Each plot has two bushes that can be blue, purple, or yellow.
- Clicking a bush yields 100 points of the corresponding color, and the bush withers.
- There is a 60% chance the neighboring bush on that plot does not wither.
- If the neighbor survives and is a different color, there is a 50% chance its value will be doubled (stackable, e.g., x2, x4, etc.).
- Clicking a bush gives a 50% chance to apply a x2 bonus multiplier to all other-colored bushes (on all plots) for subsequent harvests. This bonus can also stack.

Based on this, what is your recommendation for the next harvest?`;

    setGeneratedPrompt(prompt);
  };
  
  const copyToClipboard = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard.",
    });
  };


  return (
    <Card className="mb-6 bg-card/80 backdrop-blur-sm shadow-lg border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <CardTitle className="text-lg">Prompt Generator</CardTitle>
        </div>
        <div className="flex gap-2">
            <Button onClick={generatePrompt}>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Prompt
            </Button>
            {generatedPrompt && (
                <Button onClick={copyToClipboard} variant="outline">
                    <Clipboard className="mr-2 h-4 w-4" />
                    Copy
                </Button>
            )}
        </div>
      </CardHeader>
      <CardContent>
        {generatedPrompt ? (
            <Textarea
                readOnly
                value={generatedPrompt}
                className="mt-2 w-full h-48 text-sm bg-muted/50 font-mono"
                aria-label="Generated AI Prompt"
            />
        ) : (
            <CardDescription className="pt-2">
                Click "Generate Prompt" to create a detailed prompt for your favorite AI, based on the current game state.
            </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
