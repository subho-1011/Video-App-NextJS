import { RiMenuAddFill } from "react-icons/ri";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddVideoInPlaylistForm } from "@/components/playlists/add-video-in-playlist-form";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const VideoFuturesButton = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <DotsVerticalIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    <Dialog>
                        <DialogTrigger asChild>
                            <span className="flex items-center gap-x-2">
                                Save
                                <RiMenuAddFill />
                            </span>
                        </DialogTrigger>
                        <DialogContent className="w-fit py-10 px-8">
                            <AddVideoInPlaylistForm />
                        </DialogContent>
                    </Dialog>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
