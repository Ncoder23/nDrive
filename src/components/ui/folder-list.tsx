"use client";

import { Button } from "./button";
import { FolderActions } from "./folder-actions";
import { useRouter } from "next/navigation";
import { Folder, File } from "lucide-react";
import { deleteFolder } from "~/server/actions";

interface FolderListProps {
    folders: Array<{
        id: number;
        name: string;
    }>;
    files: Array<{
        id: number;
        name: string;
        type: string;
        url: string;
    }>;
    currentFolderId: number | null;
    onFolderCreated?: () => void;
}

export function FolderList({ folders, files, currentFolderId, onFolderCreated }: FolderListProps) {
    const router = useRouter();

    const handleDeleteFolder = async (folderId: number) => {
        if (!confirm("Are you sure you want to delete this folder and all its contents?")) {
            return;
        }

        try {
            const result = await deleteFolder(folderId);
            if (result.success) {
                onFolderCreated?.();
                router.refresh();
            } else {
                alert(result.error || "Failed to delete folder");
            }
        } catch (error) {
            console.error("Error deleting folder:", error);
            alert("Failed to delete folder");
        }
    };

    return (
        <div className="space-y-4">
            <FolderActions currentFolderId={currentFolderId} onFolderCreated={onFolderCreated} />
            
            <div className="grid gap-2">
                {folders.map((folder) => (
                    <div
                        key={folder.id}
                        className="flex items-center justify-between p-3 bg-primary rounded-lg shadow hover:bg-primary/50"
                    >
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => router.push(`/f/${folder.id}`)}
                        >
                            <Folder className="w-5 h-5 text-blue-500" />
                            <span>{folder.name}</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteFolder(folder.id)}
                        >
                            Delete
                        </Button>
                    </div>
                ))}

                {files.map((file) => (
                    <div
                        key={file.id}
                        className="flex items-center justify-between p-3 bg-primary rounded-lg shadow hover:bg-primary/50"
                    >
                        <div className="flex items-center gap-2">
                            <File className="w-5 h-5 text-gray-500" />
                            <span>{file.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(file.url, "_blank")}
                            >
                                Download
                            </Button>
                        </div>
                    </div>
                ))}

                {folders.length === 0 && files.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                        This folder is empty
                    </div>
                )}
            </div>
        </div>
    );
} 