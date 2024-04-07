import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NotLogin = () => {
    const router = useRouter();

    const onClick = () => {
        router.push("/auth/login");
    };

    return (
        <div className="flex gap-10">
            <h1 className="flex text-2xl font-normal items-center">You are not logged in</h1>
            <Button variant="outline" size="lg" className="w-fit" onClick={onClick}>
                Click to login
            </Button>
        </div>
    );
};

export default NotLogin;
