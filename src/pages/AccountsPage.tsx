import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AccountCard from "../components/AccountCard";
import type { AccountInterface } from "../types/AccountInterface";

const MAX_ACCOUNTS = 7;

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<AccountInterface[]>([
    { id: uuidv4(), name: "Conta Corrente", balance: 1250.75 },
    { id: uuidv4(), name: "Nubank", balance: 987.5 },
  ]);

  const handleAddAccount = () => {
    const name = prompt("Nome da nova conta:");
    if (!name) {
      return;
    }
    const balanceStr = prompt("Valor inicial (ex: 1000.50):");
    const balance = parseFloat(balanceStr || "0");
    setAccounts((prev) => [
      ...prev,
      { id: uuidv4(), name, balance: isNaN(balance) ? 0 : balance },
    ]);
  };

  const handleDelete = (id: string) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== id));
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">Contas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((account) => (
          <AccountCard
            key={account.id}
            account={account}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {accounts.length < MAX_ACCOUNTS && (
        <div className="pt-4">
          <button
            onClick={handleAddAccount}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            + Adicionar Conta
          </button>
        </div>
      )}
    </div>
  );
}
