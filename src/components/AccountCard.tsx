import { useState } from "react";
import type { AccountInterface } from "../types/AccountInterface";
import DropdownMenuButton from "./DropdownMenuButton";
import ConfirmDialog from "./ConfirmDialog";
import AddAccountModal from "../modules/accounts/AddAccountModal";

interface Props {
  account: AccountInterface;
  onDelete: (id: string) => void;
  onEdit: (updated: AccountInterface) => void;
}

export default function AccountCard({ account, onDelete, onEdit }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  return (
    <div className="bg-gray-700 p-4 rounded-2xl shadow relative">
      <DropdownMenuButton
        actions={[
          {
            label: "🖊️ Editar",
            onClick: () => setEditing(true),
          },
          {
            label: "🗑️ Excluir",
            onClick: () => setConfirmOpen(true),
          },
        ]}
      />

      <div className="m-5 text-left">
        <div className="text-lg font-semibold">{account.name}</div>
        <div className="text-sm text-gray-300">
          R$ {account.balance.toFixed(2)}
        </div>
      </div>

      {confirmOpen && (
        <ConfirmDialog
          title="Excluir Conta"
          message={`Tem certeza que deseja excluir a conta "${account.name}"?`}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            onDelete(account.id);
            setConfirmOpen(false);
          }}
          confirmButtonName="Excluir Conta"
          cancelButtonName="Cancelar"
        />
      )}

      {editing && (
        <AddAccountModal
          isEditing
          initialName={account.name}
          initialBalanceValue={account.initial_balance}
          onAdd={({ name, initial_balance, balance }) => {
            onEdit({
              ...account,
              name,
              initial_balance,
              balance,
            });
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      )}
    </div>
  );
}
