// src/pages/TransactionsPage.tsx
import { useState } from "react";
import type { TransactionInterface } from "../types/TransactionInterface";
import TransactionItem from "../components/Transaction/TransactionItem";

const mockAccounts = {
  "1": "Nubank",
  "2": "Carteira",
};

const initialTransactions: TransactionInterface[] = [
  {
    id: "t1",
    date: new Date().toISOString(),
    value: -55.6,
    type: "gasto",
    category: "Alimentação",
    subcategory: "Restaurante",
    name: "Restaurante X",
    account: "1",
    notes: "Almoço com amigos",
  },
  {
    id: "t1",
    date: new Date().toISOString(),
    value: 55.6,
    type: "Recebimento",
    category: "Salário",
    subcategory: "Salário",
    name: "Zia",
    account: "1",
    notes: "",
  },
];

export default function TransactionsPage() {
  const [transactions, setTransactions] =
    useState<TransactionInterface[]>(initialTransactions);

  const handleEdit = (updated: TransactionInterface) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-white">Transações</h1>

      <div className="space-y-3">
        {transactions.map((t) => (
          <TransactionItem
            key={t.id}
            transaction={t}
            accountName={"teste"}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}
