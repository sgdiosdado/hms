import { Outlet } from "@remix-run/react";

export default function Dashboard() {
  return (
    <main className="flex flex-col gap-4 p-8">
      <Outlet />
    </main>
  );
}
