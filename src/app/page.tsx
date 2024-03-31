"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
    const onCheckDB = async () => {
        await fetch("/api/test").then(async (res) => {
            const data = await res.json();
            console.log(data.users[0]);
        });
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Button variant="ghost" onClick={onCheckDB}>
                Click me
            </Button>
            <ModeToggle />
        </main>
    );
}
