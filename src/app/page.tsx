import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Button variant="ghost">Click me</Button>
            <ModeToggle />
        </main>
    );
}
