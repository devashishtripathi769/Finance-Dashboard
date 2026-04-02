import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Transactions = () => {
  const { transactions, setTransactions, role } = useContext(AppContext);

  const isAdmin = role === "admin";

  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
  });

  const [editId, setEditId] = useState(null);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAdmin) return; // 🔒 protect

    if (!form.amount || !form.category) return;

    if (editId) {
      // ✏️ UPDATE
      const updated = transactions.map((t) =>
        t.id === editId
          ? { ...t, ...form, amount: Number(form.amount) }
          : t
      );
      setTransactions(updated);
      setEditId(null);
    } else {
      // ➕ ADD
      const newTransaction = {
        id: Date.now(),
        type: form.type,
        amount: Number(form.amount),
        category: form.category,
      };
      setTransactions([...transactions, newTransaction]);
    }

    setForm({ type: "expense", amount: "", category: "" });
  };

  // 🗑 DELETE
  const handleDelete = (id) => {
    if (!isAdmin) return; // 🔒 protect
    const filtered = transactions.filter((t) => t.id !== id);
    setTransactions(filtered);
  };

  // ✏️ EDIT
  const handleEdit = (t) => {
    if (!isAdmin) return; // 🔒 protect
    setForm({
      type: t.type,
      amount: t.amount,
      category: t.category,
    });
    setEditId(t.id);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>

      {/* ✅ FORM (ADMIN ONLY) */}
      {isAdmin && (
        <form onSubmit={handleSubmit} className="space-y-3 mb-4">
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <button className="bg-blue-500 text-white p-2 w-full rounded">
            {editId ? "Update Transaction" : "Add Transaction"}
          </button>
        </form>
      )}

      {/* LIST */}
      <ul className="space-y-2">
        {transactions.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <div>
              <p className="font-semibold">{t.category}</p>
              <p className="text-sm text-gray-500">{t.type}</p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={
                  t.type === "income" ? "text-green-600" : "text-red-600"
                }
              >
                ₹{t.amount}
              </span>

              {/* ✅ EDIT + DELETE (ADMIN ONLY) */}
              {isAdmin && (
                <>
                  <button
                    onClick={() => handleEdit(t)}
                    className="text-blue-500"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-red-500"
                  >
                    🗑
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;