"use client";

import { useState, useContext } from 'react';
import { Bot, Sparkles, Clipboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Plot as GamePlot, LogEntry } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from './ui/textarea';
import { LanguageContext, translations } from '@/context/language-context';

interface AiAssistantProps {
  plots: GamePlot[];
  currentScore: number;
  logs: LogEntry[];
}

function formatPlotsForPrompt(plots: GamePlot[], t: any): string {
    return plots.map((p, i) => {
      const bushes = p.bushes.map(b => 
        `${b.color} (withered: ${b.isWithered}, bonus: x${b.bonusMultiplier}, value: ${b.value})`
      ).join(', ');
      return `  ${t.plot} ${i + 1}: [${bushes}]`;
    }).join('\n');
}

function formatLogsForPrompt(logs: LogEntry[], t: any): string {
    return [...logs].reverse().map(log => {
        let message = t[log.message] || log.message;
        if (log.values) {
            Object.entries(log.values).forEach(([key, value]) => {
                message = message.replace(`{${key}}`, value);
            });
        }
        return `[${log.timestamp.toLocaleTimeString()}] ${message}`;
    }).join('\n');
}

export default function AiAssistant({ plots, currentScore, logs }: AiAssistantProps) {
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const { toast } = useToast();
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const generatePrompt = () => {
    const plotsState = formatPlotsForPrompt(plots, t);
    const logsHistory = formatLogsForPrompt(logs, t);
    const prompt = t.prompt_template
        .replace('{plotsState}', plotsState)
        .replace('{currentScore}', currentScore.toString())
        .replace('{logsHistory}', logsHistory);

    setGeneratedPrompt(prompt);
  };
  
  const copyToClipboard = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: t.toast_copied_title,
      description: t.toast_copied_desc,
    });
  };


  return (
    <Card className="mb-6 bg-card/80 backdrop-blur-sm shadow-lg border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <CardTitle className="text-lg">{t.prompt_generator_title}</CardTitle>
        </div>
        <div className="flex gap-2">
            <Button onClick={generatePrompt}>
                <Sparkles className="mr-2 h-4 w-4" />
                {t.generate_prompt_button}
            </Button>
            {generatedPrompt && (
                <Button onClick={copyToClipboard} variant="outline">
                    <Clipboard className="mr-2 h-4 w-4" />
                    {t.copy_button}
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
                {t.prompt_generator_desc}
            </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
