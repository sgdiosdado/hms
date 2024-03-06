import { GearIcon } from "@radix-ui/react-icons";
import { Outlet } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export function loader() {
  // Return sidebar, user profile, other general app info
  return null;
}

export default function Dashboard() {
  return (
    <>
      <header className="flex justify-between border-b border-gray-200 px-8 py-4">
        <h1 className="text-3xl font-bold tracking-tight">Hotel La Playa</h1>
        <Button variant="ghost">
          <GearIcon />
        </Button>
      </header>
      <main className="flex flex-col gap-4 px-8 pt-4">
        <Outlet />
      </main>
    </>
  );
}
