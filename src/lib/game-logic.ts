import { Plot, Bush, BushColor } from '@/types';

const BUSH_COLORS: BushColor[] = ['blue', 'purple', 'yellow'];

const getRandomColor = (): BushColor => {
  return BUSH_COLORS[Math.floor(Math.random() * BUSH_COLORS.length)];
};

export const generateInitialPlots = (): Plot[] => {
  const numPlots = Math.floor(Math.random() * 3) + 3; // 3 to 5 plots
  const plots: Plot[] = [];

  for (let i = 0; i < numPlots; i++) {
    const bushes: [Bush, Bush] = [
      {
        id: 1,
        color: getRandomColor(),
        value: 100,
        isWithered: false,
        bonusMultiplier: 1,
      },
      {
        id: 2,
        color: getRandomColor(),
        value: 100,
        isWithered: false,
        bonusMultiplier: 1,
      },
    ];
    plots.push({ id: i + 1, bushes });
  }
  return plots;
};
