import React, { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import SummaryCards from "./SummaryCards";
import Charts from "./Charts";
import Transactions from "./transactions";
import Insights from "./Insights";
import RoleSwitcher from "./RoleSwitcher";

const Dashboard = () => {
  const { transactions, role } = useContext(AppContext);

  // 🔢 Calculations (memo for performance)
  const { income, expense, balance } = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    });

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [transactions]);

  return (
    <div className="p-4 md:p-6 space-y-6">
      
      {/* 🔘 Top Bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Financial Dashboard</h1>
        <RoleSwitcher />
      </div>

      {/* 💳 Summary Cards */}
      <SummaryCards
        income={income}
        expense={expense}
        balance={balance}
      />

      {/* 📈 Charts Section */}
      <Charts transactions={transactions} />

      {/* 📋 Transactions Section */}
      <Transactions />

      {/* 🧠 Insights */}
      <Insights transactions={transactions} />
    </div>
  );
};

export default Dashboard;