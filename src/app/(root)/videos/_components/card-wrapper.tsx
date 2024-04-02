"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
}

const CardWrapper = ({ children, headerLabel }: CardWrapperProps) => {
    return (
        <div className="flex w-full justify-center">
            <Card className="w-full md:max-w-4xl justify-center">
                <CardHeader>
                    <CardTitle className="text-center">{headerLabel}</CardTitle>
                </CardHeader>
                <CardContent>{children}</CardContent>
            </Card>
        </div>
    );
};

export default CardWrapper;
