export type DashboardModuleType = "summary" | "chart" | "accounts";

export interface DashboardModule {
  id: string;
  type: DashboardModuleType;
}