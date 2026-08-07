"use client";

import React, { useEffect, useState, useRef } from "react";

interface AnimatedNumberProps {
  value: number;
  format?: (num: number) => string;
  durationMs?: number;
  className?: string;
}

export default function AnimatedNumber({
  value,
  format = (n) =>
    Number.isInteger(n)
      ? n.toLocaleString()
      : n.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 }),
  durationMs = 350,
  className = "",
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);
  const requestRef = useRef<number>();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplayValue(value);
      prevValueRef.current = value;
      return;
    }

    const startValue = prevValueRef.current;
    const endValue = value;
    if (startValue === endValue) return;

    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease out quad
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const current = startValue + (endValue - startValue) * easeProgress;

      setDisplayValue(current);

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(step);
      } else {
        setDisplayValue(endValue);
        prevValueRef.current = endValue;
      }
    };

    requestRef.current = requestAnimationFrame(step);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [value, durationMs]);

  return <span className={`font-numeric tabular-nums ${className}`}>{format(displayValue)}</span>;
}
