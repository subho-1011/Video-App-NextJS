"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/lib/utils";
import NotFound from "@/components/not-found";
import Dashboard from "@/components/dashboard/dashboard";

const DashboardPage = () => {
    const { params } = useParams();
    const { username } = useAppSelector((state) => state.User.user) || {};

    if (params[0].startsWith("%40")) {
        const targetUsername = params[0].replace(/%40/g, "");

        if (targetUsername === "me" && username) {
            return <Dashboard username={username} />;
        }

        return <Dashboard username={targetUsername} />;
    }

    return <NotFound />;
};

export default DashboardPage;
