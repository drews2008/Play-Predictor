import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

type BarDataPoint = {
  [key: string]: string | number;
};

interface BarChartConfig {
  type: 'bar';
  title?: string;
  data: BarDataPoint[];
  xKey: string;
  yKeys: {
    key: string;
    label?: string;
    color?: string;
  }[];
  height?: number;
}

interface PieChartConfig {
  type: 'pie';
  title?: string;
  data: {
    name: string;
    value: number;
  }[];
  colors?: string[];
  height?: number;
}

type ChartProps = BarChartConfig | PieChartConfig;

const fallbackColors = ['#3b82f6', '#f97316', '#22c55e', '#ef4444', '#a855f7'];

const Charts: React.FC<ChartProps> = (props) => {
  const { title } = props;

  if (props.type === 'bar') {
    const { data, xKey, yKeys, height = 300 } = props;

    return (
      <div style={{ marginBottom: '2rem' }}>
        {title && <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>}
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {yKeys.map(({ key, label, color }, idx) => (
              <Bar
                key={key}
                dataKey={key}
                name={label || key}
                fill={color || fallbackColors[idx % fallbackColors.length]}
                barSize={32}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (props.type === 'pie') {
    const { data, colors = fallbackColors, height = 250 } = props;

    return (
      <div style={{ marginBottom: '2rem' }}>
        {title && <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>}
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return null;
};

export default Charts;
