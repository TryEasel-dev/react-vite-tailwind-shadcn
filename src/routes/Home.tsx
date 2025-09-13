import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16 p-4 container mx-auto">
        <h1 className="text-4xl font-bold mb-4">My Easel App</h1>
        <p className="text-muted-foreground mb-6">
          Replace this with your own content.
        </p>
        <Button>Click me</Button>
      </main>
    </div>
  );
}
