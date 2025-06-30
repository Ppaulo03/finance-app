export type DashboardModuleType = "summary" | "chart" | "accounts";

export const availableDashboardModuleTypes: DashboardModuleType[] = [
  "summary",
  "chart",
  "accounts",
];

export interface DashboardModuleInterface {
  id: string;
  type: DashboardModuleType;
}
