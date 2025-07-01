import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import AccountsPage from "./pages/AccountsPage";

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
  ]);
  return <RouterProvider router={router} />;
}
