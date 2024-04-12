"use client";

import Dashboard from "@/components/dashboard/dashboard";
import NotFound from "@/components/not-found";
import { useParams } from "next/navigation";
import React from "react";

const DashboardPage = () => {
    const params = useParams();

    if (params.params[0].startsWith("%40")) {
        const username = params.params[0].replace(/%40/g, "");
        console.log(username);

        return <Dashboard username={username}/>;
    }

    return <NotFound />;
};

export default DashboardPage;
