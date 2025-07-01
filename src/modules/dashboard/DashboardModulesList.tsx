// modules/dashboard/DashboardModulesList.tsx
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type {
  DashboardModuleInterface,
  DashboardModuleType,
} from "../../types/DashboardModuleType";
import { useState } from "react";
import { availableDashboardModuleTypes as availableTypes } from "../../types/DashboardModuleType";
import { dashboardModuleMap } from "./ModuleMap";
import DashboardModule from "./DashboardModule";

interface Props {
  modules: DashboardModuleInterface[];
  onDelete: (id: string) => void;
  onChangeType: (id: string, newType: DashboardModuleType) => void;
  onAdd: (type: DashboardModuleType) => void;
}

export default function DashboardModulesList({
  modules,
  onDelete,
  onChangeType,
  onAdd,
}: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [newType, setNewType] = useState<DashboardModuleType>("summary");

  return (
    <SortableContext
      items={modules.map((m) => m.id)}
      strategy={verticalListSortingStrategy}
    >
      <div className="space-y-6">
        {modules.map((mod) => (
          <DashboardModule
            key={mod.id}
            id={mod.id}
            type={mod.type}
            onDelete={onDelete}
            onChangeType={onChangeType}
          >
            {dashboardModuleMap[mod.type]}
          </DashboardModule>
        ))}

        {/* Adicionar módulo */}
        {modules.length < 8 && (
          <div className="text-center">
            {isAdding ? (
              <div className="inline-flex items-center space-x-2">
                <select
                  value={newType}
                  onChange={(e) =>
                    setNewType(e.target.value as DashboardModuleType)
                  }
                  className="border rounded px-2 py-1 text-sm"
                >
                  {availableTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    onAdd(newType);
                    setIsAdding(false);
                  }}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                  Adicionar
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className=" bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="text-2xl hover:text-gray-900 bg-gray-700 min-w-(--dashboard-module-spacing) rounded-full p-2 shadow hover:bg-gray-400 transition-colors duration-200"
                title="Adicionar módulo"
              >
                +
              </button>
            )}
          </div>
        )}
      </div>
    </SortableContext>
  );
}
