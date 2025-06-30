import type { ReactNode } from "react";
import MonthlySummary from "./dashboard_modules/MonthlySummary";
import FinanceChart from "./dashboard_modules/FinanceChart";
import AccountBalance from "./dashboard_modules/AccountBalance";
import type { DashboardModuleType } from "../../types/DashboardModuleType";

export const dashboardModuleMap: Record<DashboardModuleType, ReactNode> = {
  summary: <MonthlySummary />,
  chart: <FinanceChart />,
  accounts: <AccountBalance />,
};
