import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import AccountsPage from "./pages/AccountsPage";
import TransactionsPage from "./pages/TransactionsPage";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <DashboardPage />
        </>
      ),
    },
    {
      path: "/accounts",
      element: <AccountsPage />,
    },
    {
      path: "/transactions",
      element: <TransactionsPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}
