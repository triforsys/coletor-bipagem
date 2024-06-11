import React from 'react';
import {
  Tooltip as TooltipPrimitive,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Tooltip({ children, message, time }) {
  return (
    <TooltipProvider delayDuration={time || 100}>
      <TooltipPrimitive>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </TooltipPrimitive>
    </TooltipProvider>
  );
}
