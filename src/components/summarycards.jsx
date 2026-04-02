import React from "react";

const SummaryCards = ({ income, expense, balance }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      
      {/* 💰 Balance Card */}
      <div className="bg-white shadow-md rounded-2xl p-4 border">
        <h2 className="text-gray-500 text-sm">Total Balance</h2>
        <p className="text-2xl font-bold text-blue-600 mt-2">
          ₹ {balance}
        </p>
      </div>

      {/* 📈 Income Card */}
      <div className="bg-white shadow-md rounded-2xl p-4 border">
        <h2 className="text-gray-500 text-sm">Total Income</h2>
        <p className="text-2xl font-bold text-green-600 mt-2">
          ₹ {income}
        </p>
      </div>

      {/* 📉 Expense Card */}
      <div className="bg-white shadow-md rounded-2xl p-4 border">
        <h2 className="text-gray-500 text-sm">Total Expense</h2>
        <p className="text-2xl font-bold text-red-600 mt-2">
          ₹ {expense}
        </p>
      </div>

    </div>
  );
};

export default SummaryCards;