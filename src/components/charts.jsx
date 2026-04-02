import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const Charts = ({ transactions }) => {

  // 📈 Monthly Balance Data
  const monthlyData = useMemo(() => {
    const data = {};

    transactions.forEach((t) => {
      const month = new Date(t.date).toLocaleString("default", {
        month: "short",
      });

      if (!data[month]) {
        data[month] = { month, income: 0, expense: 0 };
      }

      if (t.type === "income") data[month].income += t.amount;
      else data[month].expense += t.amount;
    });

    return Object.values(data).map((m) => ({
      month: m.month,
      balance: m.income - m.expense,
    }));
  }, [transactions]);

  // 🧾 Category Breakdown (Expenses Only)
  const categoryData = useMemo(() => {
    const data = {};

    transactions.forEach((t) => {
      if (t.type === "expense") {
        data[t.category] = (data[t.category] || 0) + t.amount;
      }
    });

    return Object.keys(data).map((key) => ({
      category: key,
      value: data[key],
    }));
  }, [transactions]);

  const COLORS = ["#3b82f6", "#22c55e", "#ef4444", "#f59e0b", "#8b5cf6"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* 📈 Line Chart */}
      <div className="bg-white p-4 rounded-2xl shadow border">
        <h2 className="text-lg font-semibold mb-4">Balance Trend</h2>

        {monthlyData.length === 0 ? (
          <p className="text-gray-500">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="balance" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* 🥧 Pie Chart */}
      <div className="bg-white p-4 rounded-2xl shadow border">
        <h2 className="text-lg font-semibold mb-4">
          Spending by Category
        </h2>

        {categoryData.length === 0 ? (
          <p className="text-gray-500">No expense data</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="category"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
};

export default Charts;