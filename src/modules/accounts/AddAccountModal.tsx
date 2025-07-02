import { useState } from "react";
import { createPortal } from "react-dom";

interface AddAccountModalProps {
  onAdd: (data: {
    name: string;
    initial_balance: number;
    balance: number;
  }) => void;

  onCancel: () => void;
  initialName?: string;
  initialBalanceValue?: number;
  balanceValue?: number;
  isEditing?: boolean;
}

export default function AddAccountModal({
  onAdd,
  onCancel,
  initialName = "",
  initialBalanceValue = 0,
  balanceValue = 0,
  isEditing = false,
}: AddAccountModalProps) {
  const [name, setName] = useState(initialName);
  const [balance, setBalance] = useState(
    initialBalanceValue.toFixed(2).replace(".", ",")
  );

  const [nameError, setNameError] = useState("");
  const [balanceError, setBalanceError] = useState("");

  const handleConfirm = () => {
    let hasError = false;
    setNameError("");
    setBalanceError("");

    if (!name.trim()) {
      setNameError("O nome da conta é obrigatório.");
      hasError = true;
    }

    const parsed = parseFloat(balance.replace(",", ".")) || 0;
    if (isNaN(parsed)) {
      setBalanceError("Informe um valor numérico válido.");
      hasError = true;
    }

    if (!hasError) {
      onAdd({
        name: name.trim(),
        initial_balance: parsed,
        balance: balanceValue + parsed,
      });
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" />

      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm w-full z-10">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          {isEditing ? "Editar Conta" : "Nova Conta"}
        </h2>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-black"
            placeholder="Ex: Nubank, Carteira..."
          />
          {nameError && (
            <p className="text-sm text-red-500 mt-1">{nameError}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Saldo Inicial (R$)
          </label>
          <input
            value={balance}
            onChange={(e) => {
              const val = e.target.value.replace(".", ",");
              if (/^-?(\d+(\,\d{0,2})?)?$/.test(val)) {
                setBalance(val);
              }
            }}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-black"
            placeholder="0,00"
            inputMode="decimal"
          />
          {balanceError && (
            <p className="text-sm text-red-500 mt-1">{balanceError}</p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isEditing ? "Salvar" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
