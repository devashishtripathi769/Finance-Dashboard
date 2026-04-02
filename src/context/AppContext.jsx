import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, type: "income", amount: 5000, category: "Salary" },
          { id: 2, type: "expense", amount: 2000, category: "Food" },
        ];
  });

  const [role, setRole] = useState("user");

  // 💾 Save to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <AppContext.Provider
      value={{ transactions, setTransactions, role, setRole }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;