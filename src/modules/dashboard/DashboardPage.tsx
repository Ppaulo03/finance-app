import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import type { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import DashboardModulesList from "./DashboardModulesList";
import type {
  DashboardModuleInterface,
  DashboardModuleType,
} from "../../types/DashboardModuleType";
import { v4 as uuidv4 } from "uuid";

export default function DashboardPage() {
  const [modules, setModules] = useState<DashboardModuleInterface[]>([
    { id: "mod1", type: "summary" },
    { id: "mod2", type: "chart" },
    { id: "mod3", type: "accounts" },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setModules((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function handleDelete(id: string) {
    setModules((items) => items.filter((item) => item.id !== id));
  }

  function handleChangeType(id: string, newType: DashboardModuleType) {
    setModules((items) =>
      items.map((item) => (item.id === id ? { ...item, type: newType } : item))
    );
  }

  function handleAddModule(newType: DashboardModuleType) {
    setModules((items) => [...items, { id: uuidv4(), type: newType }]);
  }

  return (
    <div className="p-6 space-y-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <DashboardModulesList
          modules={modules}
          onDelete={handleDelete}
          onChangeType={handleChangeType}
          onAdd={handleAddModule}
        />
      </DndContext>
    </div>
  );
}
