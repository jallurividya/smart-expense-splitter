import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";

export default function Group() {
  const { id } = useParams();

  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [settlements, setSettlements] = useState([]);

  const [memberName, setMemberName] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      const m = await api.get(`/members/${id}`);
      const e = await api.get(`/expenses/${id}`);

      setMembers(m.data);
      setExpenses(e.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= ADD MEMBER =================
  const addMember = async () => {
    if (!memberName.trim()) return;

    try {
      await api.post("/members", {
        name: memberName,
        group_id: id,
      });

      setMemberName("");
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  // ================= ADD EXPENSE =================
  const addExpense = async () => {
    if (!amount || !paidBy) return;

    try {
      await api.post("/expenses", {
        group_id: id,
        amount: Number(amount),
        paid_by: paidBy,
      });

      setAmount("");
      setPaidBy("");
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  // ================= CALCULATE SETTLEMENTS =================
  const calculateSettlements = (expenses) => {
    let net = {};

    // Step 1: Net balances
    expenses.forEach((exp) => {
      if (!exp.balances) return;

      Object.entries(exp.balances).forEach(([user, val]) => {
        net[user] = (net[user] || 0) + Number(val);
      });
    });

    let creditors = [];
    let debtors = [];

    // Step 2: Separate
    Object.entries(net).forEach(([user, amount]) => {
      if (amount > 0) creditors.push({ user, amount });
      if (amount < 0) debtors.push({ user, amount: -amount });
    });

    let result = [];

    // Step 3: Simplify
    let i = 0,
      j = 0;

    while (i < creditors.length && j < debtors.length) {
      let credit = creditors[i];
      let debit = debtors[j];

      let min = Math.min(credit.amount, debit.amount);

      result.push(
        `${debit.user} pays ${credit.user} ₹${min.toFixed(2)}`
      );

      credit.amount -= min;
      debit.amount -= min;

      if (credit.amount === 0) i++;
      if (debit.amount === 0) j++;
    }

    setSettlements(result);
  };

  // 🔥 Recalculate whenever expenses change
  useEffect(() => {
    if (expenses.length > 0) {
      calculateSettlements(expenses);
    } else {
      setSettlements([]);
    }
  }, [expenses]);

  // ================= UI =================
  return (
    <div className="p-6 min-h-screen bg-[#fef6f3]">
      <h2 className="text-2xl font-bold text-[#c7522a]">
        Group Dashboard
      </h2>

      {/* ADD MEMBER */}
      <div className="mt-4">
        <input
          placeholder="Member name"
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
          className="border p-2 mr-2 rounded"
        />
        <button
          onClick={addMember}
          className="bg-[#c7522a] text-white px-3 py-2 rounded"
        >
          Add Member
        </button>
      </div>

      {/* ADD EXPENSE */}
      <div className="mt-4">
        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 mr-2 rounded"
        />

        <select
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
          className="border p-2 mr-2 rounded"
        >
          <option value="">Paid By</option>
          {members.map((m) => (
            <option key={m.id}>{m.name}</option>
          ))}
        </select>

        <button
          onClick={addExpense}
          className="bg-[#c7522a] text-white px-3 py-2 rounded"
        >
          Add Expense
        </button>
      </div>

      {/* MEMBERS */}
      <div className="mt-6">
        <h3 className="font-bold text-lg">Members</h3>
        {members.length === 0 ? (
          <p>No members yet</p>
        ) : (
          members.map((m) => (
            <div key={m.id} className="mt-1">
              {m.name}
            </div>
          ))
        )}
      </div>

      {/* EXPENSES */}
      <div className="mt-6">
        <h3 className="font-bold text-lg">Expenses</h3>
        {expenses.length === 0 ? (
          <p>No expenses yet</p>
        ) : (
          expenses.map((e) => (
            <div
              key={e.id}
              className="mt-2 p-2 border rounded bg-white"
            >
              ₹{e.amount} paid by <b>{e.paid_by}</b>
            </div>
          ))
        )}
      </div>

      {/* SETTLEMENTS */}
      <div className="mt-6">
        <h3 className="font-bold text-lg text-[#c7522a]">
          Settlements
        </h3>

        {settlements.length === 0 ? (
          <p className="text-gray-500">No balances yet</p>
        ) : (
          settlements.map((s, i) => (
            <div
              key={i}
              className="p-2 bg-[#ffeae3] rounded mt-2"
            >
              {s}
            </div>
          ))
        )}
      </div>
    </div>
  );
}