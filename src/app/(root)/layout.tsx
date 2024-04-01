import Sider from "@/components/layout/sider";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="w-full">{children}</main>
    );
};

export default MainLayout;
