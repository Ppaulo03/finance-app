import { dashboardModuleMap } from "./ModuleMap";
import type { DashboardModule } from "../../types/DashboardModule";

const modules: DashboardModule[] = [
  { id: "mod1", type: "summary" },
  { id: "mod2", type: "chart" },
  { id: "mod3", type: "accounts" },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {modules.map((mod) => (
        <div key={mod.id}>{dashboardModuleMap[mod.type]}</div>
      ))}
    </div>
  );
}
