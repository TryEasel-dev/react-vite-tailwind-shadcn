import type { Route } from "./+types/home";
import { Button } from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
  // Remember to update the title and description
  return [
    { title: "My Easel App" },
    { name: "description", content: "Welcome to My Easel App!" },
  ];
}

export default function Home() {
  return (
    <div>
      Replace this with your own content.
      <Button>Click me</Button>
    </div>
  );
}
