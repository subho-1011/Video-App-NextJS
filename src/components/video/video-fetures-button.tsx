import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { RiMenuAddFill } from "react-icons/ri";
import { CreatePlaylistForm } from "../playlists/create-playlist-form";

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
                        <DialogContent>
                            <CreatePlaylistForm />
                        </DialogContent>
                    </Dialog>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
