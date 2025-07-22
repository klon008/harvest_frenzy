"use client";

import { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { Plot, Scores, Bush, BushColor, LogEntry } from '@/types';
import { generateInitialPlots } from '@/lib/game-logic';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';
import AiAssistant from '@/components/ai-assistant';
import { Badge } from '@/components/ui/badge';
import { BushIcon } from '@/components/icons/bush-icon';
import GameLog from '@/components/game-log';
import { LanguageContext, Language, translations } from '@/context/language-context';
import LanguageSwitcher from '@/components/language-switcher';

export default function Home() {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [scores, setScores] = useState<Scores>({ blue: 0, purple: 0, yellow: 0 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [bonusApplied, setBonusApplied] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const totalScore = useMemo(() => Object.values(scores).reduce((sum, score) => sum + score, 0), [scores]);
  
  const addLog = (message: string, type: LogEntry['type'] = 'action', values?: Record<string, string | number>) => {
    // We pass the key and values to the log, and it will be translated in the GameLog component
    setLogs(prev => [{ message, type, timestamp: new Date(), values }, ...prev]);
  };

  const handlePlayAgain = useCallback(() => {
    setPlots(generateInitialPlots());
    setScores({ blue: 0, purple: 0, yellow: 0 });
    setIsGameOver(false);
    setLogs([]);
    addLog("log_new_game", "event");
  }, []);

  useEffect(() => {
    handlePlayAgain();
  }, [handlePlayAgain]);

  useEffect(() => {
    if (plots.length > 0 && plots.every(p => p.bushes.every(b => b.isWithered))) {
      setIsGameOver(true);
      addLog("log_game_over", "event", { totalScore });
    }
  }, [plots, totalScore]);

  const handleHarvest = (plotId: number, bushId: number) => {
    if (isGameOver) return;

    let newPlots = JSON.parse(JSON.stringify(plots)) as Plot[];
    const plotIndex = newPlots.findIndex(p => p.id === plotId);
    if (plotIndex === -1) return;
    
    const bushIndex = newPlots[plotIndex].bushes.findIndex(b => b.id === bushId);
    if (bushIndex === -1) return;

    const clickedBush = newPlots[plotIndex].bushes[bushIndex];
    if (clickedBush.isWithered) return;

    const points = clickedBush.value * clickedBush.bonusMultiplier;
    setScores(prev => ({ ...prev, [clickedBush.color]: prev[clickedBush.color] + points }));
    addLog('log_harvest', 'action', {
      color: clickedBush.color,
      plot: plotIndex + 1,
      points,
    });
    
    clickedBush.isWithered = true;

    // Neighbor check
    const neighborIndex = bushIndex === 0 ? 1 : 0;
    const neighborBush = newPlots[plotIndex].bushes[neighborIndex];
    if (neighborBush && !neighborBush.isWithered) {
      if (Math.random() < 0.6) { // 60% chance neighbor survives
        addLog('log_neighbor_survived', 'event', { plot: plotIndex + 1 });
        if (neighborBush.color !== clickedBush.color && Math.random() < 0.5) { // 50% chance value doubles if different color
          neighborBush.bonusMultiplier *= 2;
          addLog('log_neighbor_doubled', 'bonus', {
            plot: plotIndex + 1,
            multiplier: neighborBush.bonusMultiplier,
          });
        }
      } else {
        neighborBush.isWithered = true;
        addLog('log_neighbor_withered', 'event', { plot: plotIndex + 1 });
      }
    }
    
    // Global bonus trigger
    const bonusColor = clickedBush.color;
    let bonusTriggered = false;

    newPlots = newPlots.map((plot, pIdx) => ({
      ...plot,
      bushes: plot.bushes.map((bush, bIdx) => {
        if (!bush.isWithered && bush.color !== bonusColor) {
          if (Math.random() < 0.5) { // 50% chance for each bush
            bonusTriggered = true;
            addLog('log_bonus_applied', 'bonus', {
              color: bush.color,
              plot: pIdx + 1,
            });
            return { ...bush, bonusMultiplier: bush.bonusMultiplier * 2 };
          }
        }
        return bush;
      }) as [Bush, Bush],
    }));
    
    if(bonusTriggered) {
      const bonusMessageKey: keyof typeof t = 'bonus_triggered';
      const bonusMessage = t[bonusMessageKey].replace('{color}', bonusColor);
      setBonusApplied(bonusMessage);
      addLog('log_bonus_triggered', 'event', { color: bonusColor });
      setTimeout(() => setBonusApplied(null), 2000);
    }

    setPlots(newPlots);
  };

  return (
    <main className="container mx-auto p-4 sm:p-6 md:p-8 font-body">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary-foreground/90 tracking-tight">{t.title}</h1>
            <p className="text-muted-foreground mt-1">{t.subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button onClick={handlePlayAgain} size="lg">
            <RefreshCw className="mr-2 h-5 w-5" /> {t.play_again}
          </Button>
        </div>
      </header>

      <Card className="mb-6 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <BushIcon color="blue" className="w-8 h-8"/>
                <span className="text-2xl font-bold text-blue-600">{scores.blue}</span>
              </div>
              <div className="flex items-center gap-2">
                <BushIcon color="purple" className="w-8 h-8"/>
                <span className="text-2xl font-bold text-purple-600">{scores.purple}</span>
              </div>
              <div className="flex items-center gap-2">
                <BushIcon color="yellow" className="w-8 h-8"/>
                <span className="text-2xl font-bold text-yellow-500">{scores.yellow}</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{t.total_score}</p>
              <p className="text-3xl font-bold">{totalScore}</p>
            </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AiAssistant plots={plots} currentScore={totalScore} logs={logs} />

          {isGameOver && (
              <Card className="my-6 text-center p-6 bg-primary/20 border-primary">
                  <h2 className="text-2xl font-bold">{t.game_over_title}</h2>
                  <p className="text-xl mt-2">{t.game_over_subtitle.replace('{totalScore}', totalScore.toString())}</p>
                  <Button onClick={handlePlayAgain} className="mt-4">{t.play_again}</Button>
              </Card>
          )}

          {bonusApplied && (
            <div className="fixed top-5 right-5 bg-accent text-accent-foreground p-3 rounded-lg shadow-lg animate-in fade-in zoom-in">
              {bonusApplied}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {plots.map((plot, plotIndex) => (
              <Card key={plot.id} className="p-4 flex flex-col items-center gap-4 shadow-md hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-bold text-lg text-muted-foreground">{t.plot} {plotIndex + 1}</h3>
                <div className="flex justify-center items-end gap-4">
                  {plot.bushes.map((bush) => (
                    <div key={bush.id} className="relative flex flex-col items-center">
                      {bush.bonusMultiplier > 1 && !bush.isWithered && (
                        <Badge variant="destructive" className="absolute -top-2 z-10 animate-pulse bg-accent text-accent-foreground">x{bush.bonusMultiplier}</Badge>
                      )}
                      <button
                        onClick={() => handleHarvest(plot.id, bush.id)}
                        disabled={bush.isWithered || isGameOver}
                        aria-label={`Harvest ${bush.color} bush`}
                        className={`transition-all duration-300 ease-in-out ${bush.isWithered ? 'opacity-30 scale-75 grayscale' : 'hover:scale-110 cursor-pointer'}`}
                      >
                        <BushIcon color={bush.color} className="w-24 h-24" />
                      </button>
                      <span className="text-sm font-semibold text-muted-foreground">{bush.value * bush.bonusMultiplier}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <GameLog logs={logs} />
        </div>
      </div>
    </main>
  );
}
