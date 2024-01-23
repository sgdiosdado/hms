import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
// Landing page purposes
export default function Index() {
  return (
    <div
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
      className="min-h-svh"
    >
      <h1 className="text-4xl font-bold">Hotel Management System</h1>
      <Button>Reservar</Button>
    </div>
  );
}
