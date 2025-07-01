import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";

import DashboardModulesList from "./DashboardModulesList";
import type {
  DashboardModuleInterface,
  DashboardModuleType,
} from "../../types/DashboardModuleType";

import { useLocalStorageState } from "../../hooks/useLocalStorage";

const LOCAL_STORAGE_KEY = "dashboard-modules-list";
const getDefaultModules = (): DashboardModuleInterface[] => [
  { id: uuidv4(), type: "summary" },
  { id: uuidv4(), type: "chart" },
  { id: uuidv4(), type: "accounts" },
];

const validateModules = (data: unknown): data is DashboardModuleInterface[] =>
  Array.isArray(data) &&
  data.every(
    (mod) => typeof mod.id === "string" && typeof mod.type === "string"
  );

export default function DashboardPage() {
  const [modules, setModules] = useLocalStorageState<
    DashboardModuleInterface[]
  >(LOCAL_STORAGE_KEY, getDefaultModules(), validateModules);
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
