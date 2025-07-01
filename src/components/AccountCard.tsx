import { MoreVertical } from "lucide-react";
import type { AccountInterface } from "../types/AccountInterface";

interface Props {
  account: AccountInterface;
  onDelete: (id: string) => void;
  // outros handlers: editar, etc
}

export default function AccountCard({ account, onDelete }: Props) {
  return (
    <div className="p-4 rounded-xl shadow bg-white dark:bg-gray-800 flex justify-between items-center">
      <div>
        <div className="text-lg font-semibold">{account.name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-300">
          R$ {account.balance.toFixed(2)}
        </div>
      </div>
      <button
        onClick={() => onDelete(account.id)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
      >
        <MoreVertical size={18} />
      </button>
    </div>
  );
}
