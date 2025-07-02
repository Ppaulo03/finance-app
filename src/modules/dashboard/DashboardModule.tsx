import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import type { DashboardModuleType } from "../../types/DashboardModuleType";
import { availableDashboardModuleTypes as availableTypes } from "../../types/DashboardModuleType";
import { GripVertical } from "lucide-react";
import DropdownMenuButton from "../../components/DropdownMenuButton";

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

  const [changingType, setChangingType] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as DashboardModuleType;
    onChangeType(id, value);
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
        className="absolute top-0 left-0 h-full w-[5%] cursor-grab bg-gray-800  flex items-center justify-center rounded-l-2xl z-10"
      >
        <GripVertical size={21} />
      </div>

      <DropdownMenuButton
        onOpen={() => {
          setChangingType(false);
        }}
        actions={[
          {
            label: "🗑️ Excluir",
            onClick: () => onDelete(id),
          },
          {
            label: changingType ? type : "🔁 Alterar",
            type: changingType ? "select" : "button",
            closeOnClick: changingType,
            onClick: changingType ? () => {} : () => setChangingType(true),
            onChange: changingType
              ? (value) => {
                  handleChange(value);
                }
              : (_) => {},
            class: changingType
              ? "w-full px-3 py-2 border-t text-sm"
              : undefined,
            value: changingType ? type : undefined,
            options: changingType ? availableTypes : [],
          },
        ]}
      ></DropdownMenuButton>

      <div className="m-5 pl-[2%]">{children}</div>
    </div>
  );
}
