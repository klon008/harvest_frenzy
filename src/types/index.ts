export type BushColor = 'blue' | 'purple' | 'yellow';

export interface Bush {
  id: number;
  color: BushColor;
  value: number;
  isWithered: boolean;
  bonusMultiplier: number;
}

export interface Plot {
  id: number;
  bushes: [Bush, Bush];
}

export type Scores = Record<BushColor, number>;

export interface LogEntry {
  timestamp: Date;
  message: string;
  type: 'action' | 'event' | 'bonus';
}
