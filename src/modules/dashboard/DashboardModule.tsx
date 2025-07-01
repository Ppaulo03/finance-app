import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef, useState } from "react";
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
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(false);
      }
    };

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openMenu]);

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
        className="absolute top-2 left-2  m-1  cursor-grab hover:text-gray-400"
      >
        <GripVertical size={18} />
      </div>

      {/* Menu de três pontinhos */}
      <div className="absolute top-2 right-2 m-1 bg-transparent">
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.currentTarget.blur();
            setOpenMenu((prev) => !prev);
          }}
          className="active:outline-none focus:outline-none focus:ring-2 hover:text-gray-400"
        >
          <MoreVertical size={20} />
        </button>
        {openMenu && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 w-36 bg-white border rounded shadow z-10"
          >
            <ul className="text-sm text-gray-800">
              <li>
                <button
                  onClick={() => {
                    onDelete(id);
                    setOpenMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-red-100"
                >
                  🗑️ Excluir
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
                    🔁 Alterar
                  </button>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="m-5">{children}</div>
    </div>
  );
}
