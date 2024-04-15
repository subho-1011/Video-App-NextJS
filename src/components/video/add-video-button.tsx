import { Button } from "@/components/ui/button";
import Link from "next/link";

import { RiVideoAddLine } from "react-icons/ri";

export const AddVideoButton = () => {
    return (
        <span>
            <Link href="/videos/add-video">
                <Button variant="outline">
                    <RiVideoAddLine size={16} />
                </Button>
            </Link>
        </span>
    );
};
