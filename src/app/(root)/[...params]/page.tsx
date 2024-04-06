"use client";

import NotFound from "@/components/not-found";
import { useParams } from "next/navigation";
import React from "react";

export default function CatchAllPage() {
    const params = useParams();

    if (params.params[0].startsWith("%40")) {
        return (
            <div>
                <h1>This is channel dashboard page</h1>
            </div>
        );
    }

    return <NotFound />;
}
