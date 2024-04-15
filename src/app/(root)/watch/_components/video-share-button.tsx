"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Share2Icon } from "lucide-react";

export const VideoShareButton = () => {
    const ulrRef = useRef(null);

    const currentUrl = window.location.href;
    const onClick = () => {
        // ulrRef?.current?.select();
        document.execCommand("copy");
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="secondary" size="lg" className="gap-2">
                    <Share2Icon size={16} />
                    <span> | </span>
                    Share
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Share with others</DialogTitle>
                <DialogDescription>Click to copy</DialogDescription>
                <div className="flex gap-2">
                    <Input type="text" value={currentUrl} ref={ulrRef} readOnly />
                    <Button onClick={onClick}>Copy</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
