"use client";

import React, { use, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/utils";
import NotFound from "@/components/not-found";
import Dashboard from "@/components/dashboard/dashboard";
import { setChannelName } from "@/store/features/dashboard-slice";

const DashboardPage = () => {
    const { params } = useParams();
    const { username } = useAppSelector((state) => state.User.user) || {};
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (params[0].startsWith("%40")) {
            const targetUsername = params[0].replace(/%40/g, "");

            if (targetUsername === "me" && username) {
                dispatch(setChannelName(username));
            } else if (targetUsername !== "me") {
                dispatch(setChannelName(targetUsername));
            }
        }
    }, [dispatch, params, username]);

    if (params[0].startsWith("%40")) {
        return <Dashboard />;
    }

    return <NotFound />;
};

export default DashboardPage;
