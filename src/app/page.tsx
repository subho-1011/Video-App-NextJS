import { PrismaClient } from "@prisma/client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
    const prisma = new PrismaClient();

    async function main() {
        const users = await prisma.user.findMany();
        console.log(users);
    }
    main()
        .catch(async (e) => {
            console.error(e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Button variant="ghost">Click me</Button>
            <ModeToggle />
        </main>
    );
}
