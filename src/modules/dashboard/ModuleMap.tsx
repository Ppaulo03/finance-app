import type { ReactNode } from "react";
import MonthlySummary from "./MonthlySummary";
import FinanceChart from "./FinanceChart";
import AccountBalance from "./AccountBalance";
import type { DashboardModuleType } from "../../types/DashboardModule";

export const dashboardModuleMap: Record<DashboardModuleType, ReactNode> = {
  summary: <MonthlySummary />,
  chart: <FinanceChart />,
  accounts: <AccountBalance />,
};
