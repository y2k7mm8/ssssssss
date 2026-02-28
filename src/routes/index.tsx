import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "../ui/DashboardLayout";
import { AuthLayout } from "../ui/AuthLayout";

import { HomePage } from "../pages/HomePage";
import { DashboardPage } from "../pages/DashboardPage";
import { ItemsPage } from "../pages/ItemsPage";
import { ItemDetailsPage } from "../pages/ItemDetailsPage";
import { ExplanationPage } from "../pages/ExplanationPage";
import { ProgressPage } from "../pages/ProgressPage";
import { LoginPage } from "../pages/LoginPage";

export const router = createBrowserRouter([
  {
    element: <DashboardLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/items", element: <ItemsPage /> },
      { path: "/items/:id", element: <ItemDetailsPage /> },
      { path: "/explanation", element: <ExplanationPage /> },
      { path: "/progress", element: <ProgressPage /> },
    ],
  },
  { element: <AuthLayout />, children: [{ path: "/login", element: <LoginPage /> }] },
]);
