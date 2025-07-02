import { useState } from "react";
import type { AccountInterface } from "../types/AccountInterface";
import DropdownMenuButton from "./DropdownMenuButton";
import ConfirmDialog from "./ConfirmDialog";

interface Props {
  account: AccountInterface;
  onDelete: (id: string) => void;
}

export default function AccountCard({ account, onDelete }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="bg-gray-700 p-4 rounded-2xl shadow relative">
      <DropdownMenuButton
        actions={[
          {
            label: "🗑️ Excluir",
            onClick: () => setConfirmOpen(true),
          },
        ]}
      ></DropdownMenuButton>
      <div className="m-5 text-left">
        <div className="text-lg font-semibold text-left">{account.name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-300 text-left">
          R$ {account.balance.toFixed(2)}
        </div>
      </div>

      {confirmOpen && (
        <ConfirmDialog
          title="Excluir Conta"
          message={`Tem certeza que deseja excluir a conta "${account.name}"?`}
          onCancel={() => {
            onDelete(account.id);
            setConfirmOpen(false);
          }}
          onConfirm={() => setConfirmOpen(false)}
          confirmButtonName="Cancelar"
          cancelButtonName="Excluir Conta"
        />
      )}
    </div>
  );
}
