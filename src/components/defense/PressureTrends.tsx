import cn from 'classnames';
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";import { Card, CardContent } from '../ui/card';

// Props interface for reusable integration
interface PressureTrendsProps {
  data: {
    week: string;
    blitzRate: number;
    pressureRate: number;
    sackRate: number;
  }[];
  className?: string;
}

// Fallback demo data (can be replaced by real props)
const sampleData = [
  { week: "Week 1", blitzRate: 22, pressureRate: 30, sackRate: 8 },
  { week: "Week 2", blitzRate: 25, pressureRate: 28, sackRate: 10 },
  { week: "Week 3", blitzRate: 20, pressureRate: 26, sackRate: 7 },
  { week: "Week 4", blitzRate: 27, pressureRate: 34, sackRate: 12 },
];

// Main component
export const PressureTrends: React.FC<Partial<PressureTrendsProps>> = ({
  data = sampleData,
  className = "",
}) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2">Pressure Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="blitzRate" fill="#8884d8" name="Blitz Rate (%)" />
            <Bar dataKey="pressureRate" fill="#82ca9d" name="Pressure Rate (%)" />
            <Bar dataKey="sackRate" fill="#ffc658" name="Sack Rate (%)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
