
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface ChartData {
  name: string;
  [key: string]: string | number;
}

interface ChartProps {
  type: 'bar' | 'line' | 'pie';
  data: ChartData[];
  title: string;
}

const COLORS = ['#3b82f6', '#10b981', '#ef4444', '#f97316', '#8b5cf6', '#ec4899'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-md shadow-lg">
        <p className="font-semibold text-gray-700">{label}</p>
        {payload.map((pld: any, index: number) => (
          <p key={index} style={{ color: pld.color }}>
            {`${pld.name}: ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(pld.value)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ReusableChart: React.FC<ChartProps> = ({ type, data, title }) => {
  const formatCurrency = (value: number) => `Rp${(value / 1000000).toFixed(0)} Jt`;

  const renderChart = () => {
    switch (type) {
      case 'bar':
        const barKeys = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'name') : [];
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{fontSize: "14px"}}/>
            {barKeys.map((key, index) => (
              <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} name={key} />
            ))}
          </BarChart>
        );
      case 'line':
        const lineKeys = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'name') : [];
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12 }}/>
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{fontSize: "14px"}}/>
            {lineKeys.map((key, index) => (
                <Line key={key} type="monotone" dataKey={key} stroke={COLORS[index % COLORS.length]} strokeWidth={2} name={key} />
            ))}
          </LineChart>
        );
      case 'pie':
        return (
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value:number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)} />
              <Legend />
            </PieChart>
        )
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-96">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">{title}</h3>
      <ResponsiveContainer width="100%" height="85%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default ReusableChart;

