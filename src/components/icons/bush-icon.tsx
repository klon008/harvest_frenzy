import { cn } from '@/lib/utils';
import type { BushColor } from '@/types';

interface BushIconProps extends React.SVGProps<SVGSVGElement> {
  color: BushColor;
}

const colorMap: Record<BushColor, { main: string; shadow: string }> = {
  blue: { main: '#3b82f6', shadow: '#1d4ed8' },
  purple: { main: '#a855f7', shadow: '#7e22ce' },
  yellow: { main: '#facc15', shadow: '#ca8a04' },
};

export function BushIcon({ color, className, ...props }: BushIconProps) {
  const { main, shadow } = colorMap[color];
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      className={cn("w-16 h-16", className)}
      {...props}
    >
      <g transform="translate(0, -5)">
        <path d="M 50,70 C 40,90 30,80 30,95 L 70,95 C 70,80 60,90 50,70" fill="#8B5E3C" />
        <path d="M 50,75 C 55,70 60,65 52,60" stroke="#654321" strokeWidth="2" fill="none" />
        
        <circle cx="50" cy="40" r="12" fill={main} />
        <circle cx="50" cy="40" r="10" fill={main} stroke={shadow} strokeWidth="1" />
        
        <circle cx="38" cy="50" r="12" fill={main} />
        <circle cx="38" cy="50" r="10" fill={main} stroke={shadow} strokeWidth="1" />

        <circle cx="62" cy="50" r="12" fill={main} />
        <circle cx="62" cy="50" r="10" fill={main} stroke={shadow} strokeWidth="1" />

        <circle cx="50" cy="60" r="12" fill={main} />
        <circle cx="50" cy="60" r="10" fill={main} stroke={shadow} strokeWidth="1" />
        
        <circle cx="42" cy="28" r="12" fill={main} />
        <circle cx="42" cy="28" r="10" fill={main} stroke={shadow} strokeWidth="1" />

        <circle cx="58" cy="28" r="12" fill={main} />
        <circle cx="58" cy="28" r="10" fill={main} stroke={shadow} strokeWidth="1" />

        <path d="M 50,30 C 40,10 60,10 50,30" fill="#22C55E" />
        <path d="M 50,30 C 60,20 70,30 50,30" fill="#16A34A" />
      </g>
    </svg>
  );
}
