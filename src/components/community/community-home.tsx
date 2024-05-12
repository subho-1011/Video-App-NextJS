"use client";

import React from "react";
import CommunityCard from "./community-card";
import { AddCommunityForm } from "./add-community-form";
import { useGetAllCommunities } from "@/hooks/communities";
import { TCommunityDetails } from "@/types";

const CommunityHome: React.FC = () => {
    const { error, communities, setCommunities } = useGetAllCommunities();

    const handleAddCommunity = (newCommunity: TCommunityDetails) => {
        if (!communities) {
            setCommunities([newCommunity]);
        }

        if (newCommunity && communities) {
            setCommunities([newCommunity, ...communities]);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col gap-y-6 w-full md:max-w-2xl justify-center items-center">
                <AddCommunityForm handleAddCommunity={handleAddCommunity} />
                {communities && communities.map((community) => <CommunityCard key={community.id} {...community} />)}
            </div>
        </div>
    );
};

export default CommunityHome;
