import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import type { DashboardModuleType } from "../../types/DashboardModuleType";
import { availableDashboardModuleTypes as availableTypes } from "../../types/DashboardModuleType";
import { MoreVertical, GripVertical } from "lucide-react";

interface DashboardModuleProps {
  id: string;
  type: string;
  children: React.ReactNode;
  onDelete: (id: string) => void;
  onChangeType: (id: string, newType: DashboardModuleType) => void;
}

export default function DashboardModule({
  id,
  type,
  children,
  onDelete,
  onChangeType,
}: DashboardModuleProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [openMenu, setOpenMenu] = useState(false);
  const [changingType, setChangingType] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as DashboardModuleType;
    onChangeType(id, value);
    setChangingType(false);
    setOpenMenu(false);
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-700 p-4 rounded-2xl shadow relative min-w-(--dashboard-module-spacing)"
    >
      {/* Área de drag separada */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 cursor-grab text-gray-400 hover:text-gray-600"
      >
        <GripVertical size={18} />
      </div>

      {/* Menu de três pontinhos */}
      <div className="absolute top-2 right-2">
        <button
          onClick={(e) => {
            e.stopPropagation(); // 🔒 Evita que clique propague e acione drag
            setOpenMenu((prev) => !prev);
          }}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <MoreVertical size={18} />
        </button>
        {openMenu && (
          <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow z-10">
            <ul className="text-sm text-gray-800">
              <li>
                <button
                  onClick={() => {
                    onDelete(id);
                    setOpenMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-red-100"
                >
                  🗑️ Excluir módulo
                </button>
              </li>
              <li>
                {changingType ? (
                  <select
                    value={type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-t text-sm"
                  >
                    {availableTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                ) : (
                  <button
                    onClick={() => setChangingType(true)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    🔁 Alterar tipo
                  </button>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>

      {children}
    </div>
  );
}
