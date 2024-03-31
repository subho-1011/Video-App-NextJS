"use client";

export const AuthCardHeader = ({ label }: { label: string }) => {
    return (
        <div className=" w-full flex flex-col gap-y-4 items-center justify-center">
            {/* TODO: Add logo */}
            <h1 className="text-3xl font-semibold">Video App</h1>
            <p className=" text-muted-foreground text-sm">{label}</p>
        </div>
    );
};
