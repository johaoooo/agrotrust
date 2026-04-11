import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', ventes: 4000 },
  { month: 'Fév', ventes: 3000 },
  { month: 'Mar', ventes: 5000 },
  { month: 'Avr', ventes: 7000 },
  { month: 'Mai', ventes: 6000 },
  { month: 'Juin', ventes: 8000 },
];

export default function SalesChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold mb-4">📊 Évolution des ventes</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="ventes" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
