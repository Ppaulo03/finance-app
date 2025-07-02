import { createPortal } from "react-dom";

interface ConfirmDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonName?: string;
  cancelButtonName?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
}

export default function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
  confirmButtonName = "Confirmar",
  cancelButtonName = "Cancelar",
  confirmButtonClassName = "px-4 py-2 bg-blue-600 text-white rounded  hover:bg-blue-700",
  cancelButtonClassName = "px-4 py-2  bg-red-600   text-white  rounded hover:bg-red-700",
}: ConfirmDialogProps) {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-60" />
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full z-51">
        <h2 className="text-lg font-bold mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button className={cancelButtonClassName} onClick={onCancel}>
            {cancelButtonName}
          </button>
          <button className={confirmButtonClassName} onClick={onConfirm}>
            {confirmButtonName}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
