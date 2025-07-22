"use client";

import { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { LogEntry } from "@/types";
import { BookText, Zap, Pointer } from 'lucide-react';
import { cn } from "@/lib/utils";
import { LanguageContext, translations } from "@/context/language-context";

interface GameLogProps {
  logs: LogEntry[];
}

const logTypeConfig = {
    action: { icon: Pointer, color: 'text-blue-500', badge: 'secondary' },
    event: { icon: BookText, color: 'text-gray-500', badge: 'outline' },
    bonus: { icon: Zap, color: 'text-yellow-500', badge: 'default' },
};

export default function GameLog({ logs }: GameLogProps) {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const translateLog = (log: LogEntry) => {
    let message = t[log.message as keyof typeof t] || log.message;
    if (log.values) {
        Object.entries(log.values).forEach(([key, value]) => {
            message = message.replace(`{${key}}`, value);
        });
    }
    return message;
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center gap-2">
        <BookText className="h-6 w-6 text-primary" />
        <CardTitle>{t.game_log_title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <ScrollArea className="h-[600px] p-4">
            <div className="space-y-4">
            {logs.length === 0 && <p className="text-muted-foreground text-center p-4">{t.game_log_empty}</p>}
            {logs.map((log, index) => {
                const config = logTypeConfig[log.type];
                const Icon = config.icon;
                return (
                    <div key={index} className="flex items-start gap-3">
                        <div className={cn("flex-shrink-0 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-muted", config.color)}>
                            <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex-grow">
                            <p className="text-sm text-foreground/90">{translateLog(log)}</p>
                            <p className="text-xs text-muted-foreground">
                                {log.timestamp.toLocaleTimeString()}
                            </p>
                        </div>
                    </div>
                );
            })}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
