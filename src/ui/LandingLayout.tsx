import { Outlet } from "react-router-dom";
import { Header } from "../components/organisms/header/Header";

export function LandingLayout() {
  return (
    <div className="min-h-full">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <Outlet />
      </main>
    </div>
  );
}
