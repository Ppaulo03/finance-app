import type { AccountInterface } from "../types/AccountInterface";
import DropdownMenuButton from "./DropdownMenuButton";

interface Props {
  account: AccountInterface;
  onDelete: (id: string) => void;
  // outros handlers: editar, etc
}

export default function AccountCard({ account, onDelete }: Props) {
  return (
    <div className="bg-gray-700 p-4 rounded-2xl shadow relative">
      <DropdownMenuButton
        actions={[
          {
            label: "🗑️ Excluir",
            onClick: () => onDelete(account.id),
          },
        ]}
      ></DropdownMenuButton>
      <div className="m-5 text-left">
        <div className="text-lg font-semibold text-left">{account.name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-300 text-left">
          R$ {account.balance.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
