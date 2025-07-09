// src/components/EditTransactionModal.tsx
import { useState } from "react";
import { createPortal } from "react-dom";
import type { TransactionInterface } from "../../types/TransactionInterface";

interface Props {
  transaction: TransactionInterface;
  onCancel: () => void;
  onConfirm: (t: TransactionInterface) => void;
}

export default function EditTransactionModal({
  transaction,
  onCancel,
  onConfirm,
}: Props) {
  const [value, setValue] = useState(
    transaction.value.toString().replace(".", ",")
  );
  const [category, setCategory] = useState(transaction.category);

  const handleConfirm = () => {
    const parsed = parseFloat(value.replace(",", ".")) || 0;
    onConfirm({ ...transaction, value: parsed, category });
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm w-full z-10">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Editar Transação
        </h2>

        <div className="mb-3">
          <label className="text-sm text-gray-700 block mb-1">Valor</label>
          <input
            value={value}
            onChange={(e) => {
              const val = e.target.value.replace(".", ",");
              if (/^-?(\d+(\,\d{0,2})?)?$/.test(val)) {
                setValue(val);
              }
            }}
            className="w-full px-3 py-2 border rounded text-black text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-700 block mb-1">Categoria</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded text-black text-sm"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
