import type { TransactionInterface } from "../../types/TransactionInterface";
import { useState } from "react";
import EditTransactionModal from "./EditTransactionModal";

interface Props {
  transaction: TransactionInterface;
  accountName: string;
  onEdit: (updated: TransactionInterface) => void;
}

export default function TransactionItem({
  transaction,
  accountName,
  onEdit,
}: Props) {
  const [editing, setEditing] = useState(false);

  return (
    <div
      className="bg-gray-700 p-4 rounded-xl shadow hover:bg-gray-600 cursor-pointer"
      onClick={() => setEditing(true)}
    >
      <div className="flex justify-between">
        <div>
          <div>{transaction.subcategory}</div>
          <div className="text-gray-200 text-sm mt-1">{accountName}</div>
        </div>

        <div>
          <div
            className={`font-semibold ${
              transaction.value < 0 ? "text-red-400" : "text-green-400"
            }`}
          >
            {transaction.value < 0 ? "-" : ""} R${" "}
            {Math.abs(transaction.value).toFixed(2)}
          </div>
          <div className="text-sm text-gray-300">
            {new Date(transaction.date).toLocaleDateString()}
          </div>
        </div>
      </div>
      {/* {editing && (
        <EditTransactionModal
          transaction={transaction}
          onCancel={() => setEditing(false)}
          onConfirm={(updated) => {
            onEdit(updated);
            setEditing(false);
          }}
        />
      )} */}
    </div>
  );
}
