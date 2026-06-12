"use client";

import { todayStr, dateOffset, dayLabel } from "@/lib/utils";

interface WeekChartProps {
  getData: (date: string) => number | null;
}

export default function WeekChart({ getData }: WeekChartProps) {
  // Build 7 days ending today
  const days: string[] = [];
  for (let i = -6; i <= 0; i++) {
    days.push(dateOffset(i));
  }

  // Find max value for scaling
  const values = days.map((d) => getData(d) ?? 0);
  const max = Math.max(...values, 1);

  return (
    <div className="bars">
      {days.map((date, i) => {
        const val = values[i];
        const pct = val > 0 ? (val / max) * 100 : 0;

        return (
          <div key={date} className="bar-col">
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{ height: `${pct}%` }}
                title={`${date}: ${val}`}
              />
            </div>
            <div className="bar-lbl">{dayLabel(date)}</div>
          </div>
        );
      })}
    </div>
  );
}
