import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="min-h-full grid place-items-center px-4">
      <div className="w-full max-w-md rounded-xl2 border border-stroke bg-surface p-6 shadow-soft">
        <Outlet />
      </div>
    </div>
  );
}
