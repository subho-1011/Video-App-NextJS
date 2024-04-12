import React from "react";

export default function DashboardLayout({
    children,
    subpages,
}: {
    children: React.ReactNode;
    subpages: React.ReactNode;
}) {
    return (
        <div className="space-y-4">
            {children}
            {subpages}
        </div>
    );
}
