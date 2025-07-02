import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AccountCard from "../components/AccountCard";
import type { AccountInterface } from "../types/AccountInterface";
import AddAccountModal from "../modules/accounts/AddAccountModal";
import { useLocalStorageState } from "../hooks/useLocalStorage";

const LOCAL_STORAGE_ACCOUNTS_KEY = "accounts";
const MAX_ACCOUNTS = 7;

const validateAccounts = (data: unknown): data is AccountInterface[] =>
  Array.isArray(data) &&
  data.every(
    (acc) =>
      typeof acc.id === "string" &&
      typeof acc.name === "string" &&
      typeof acc.initial_balance === "number" &&
      typeof acc.balance === "number"
  );

export default function AccountsPage() {
  const [showModal, setShowModal] = useState(false);

  const [accounts, setAccounts] = useLocalStorageState<AccountInterface[]>(
    LOCAL_STORAGE_ACCOUNTS_KEY,
    [],
    validateAccounts
  );

  const handleAddAccount = (data: {
    name: string;
    initial_balance: number;
    balance: number;
  }) => {
    const newAccount = {
      id: uuidv4(),
      name: data.name,
      initial_balance: data.initial_balance,
      balance: data.balance,
    };
    setAccounts((prev) => [...prev, newAccount]);
    setShowModal(false);
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
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            + Adicionar Conta
          </button>
        </div>
      )}
      {showModal && (
        <AddAccountModal
          onAdd={handleAddAccount}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
