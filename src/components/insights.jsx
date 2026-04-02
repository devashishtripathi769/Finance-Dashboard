import React, { useMemo } from "react";

const Insights = ({ transactions }) => {

  // 📊 Highest Spending Category
  const topCategory = useMemo(() => {
    const categoryTotals = {};

    transactions.forEach((t) => {
      if (t.type === "expense") {
        categoryTotals[t.category] =
          (categoryTotals[t.category] || 0) + t.amount;
      }
    });

    const sorted = Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    );

    return sorted.length > 0 ? sorted[0] : null;
  }, [transactions]);

  // 📅 Monthly Comparison
  const monthlyComparison = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const lastMonth = currentMonth - 1;

    let currentTotal = 0;
    let lastTotal = 0;

    transactions.forEach((t) => {
      if (t.type === "expense") {
        const month = new Date(t.date).getMonth();

        if (month === currentMonth) currentTotal += t.amount;
        if (month === lastMonth) lastTotal += t.amount;
      }
    });

    return {
      currentTotal,
      lastTotal,
      difference: currentTotal - lastTotal,
    };
  }, [transactions]);

  return (
    <div className="bg-white p-4 rounded-2xl shadow border space-y-4">
      <h2 className="text-lg font-semibold">Insights</h2>

      {/* 🏆 Top Category */}
      <div className="p-3 bg-gray-50 rounded-lg">
        <h3 className="text-sm text-gray-500">
          Highest Spending Category
        </h3>

        {topCategory ? (
          <p className="text-lg font-bold text-red-500 mt-1">
            {topCategory[0]} (₹ {topCategory[1]})
          </p>
        ) : (
          <p className="text-gray-400 mt-1">
            No expense data available
          </p>
        )}
      </div>

      {/* 📅 Monthly Comparison */}
      <div className="p-3 bg-gray-50 rounded-lg">
        <h3 className="text-sm text-gray-500">
          Monthly Expense Comparison
        </h3>

        <p className="mt-1">
          This Month:{" "}
          <span className="font-semibold">
            ₹ {monthlyComparison.currentTotal}
          </span>
        </p>

        <p>
          Last Month:{" "}
          <span className="font-semibold">
            ₹ {monthlyComparison.lastTotal}
          </span>
        </p>

        <p
          className={`mt-1 font-medium ${
            monthlyComparison.difference > 0
              ? "text-red-500"
              : "text-green-600"
          }`}
        >
          {monthlyComparison.difference > 0
            ? `↑ Increased by ₹ ${monthlyComparison.difference}`
            : `↓ Decreased by ₹ ${Math.abs(
                monthlyComparison.difference
              )}`}
        </p>
      </div>

    </div>
  );
};

export default Insights;