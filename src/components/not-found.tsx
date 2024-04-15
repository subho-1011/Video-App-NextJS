import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const NotFound = () => {
    const router = useRouter();

    const onClick = () => {
        router.push("/");
    };

    return (
        <div className="flex w-full min-h-[60vh] justify-center items-center">
            <Card className="flex flex-col text-center w-full max-w-lg min-h-64 items-center justify-around">
                <CardHeader>
                    <CardTitle className=" text-destructive">404</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-2xl">Page not found</p>
                </CardContent>
                <CardFooter className=" justify-center">
                    <Button variant="link" size="sm" onClick={onClick}>
                        go to home
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default NotFound;
