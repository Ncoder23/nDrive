"use client";

import { useState } from "react";
import { Button } from "./button";
import { createFolder, deleteFolder } from "~/server/actions";
import { useRouter } from "next/navigation";

interface FolderActionsProps {
    currentFolderId: number | null;
    onFolderCreated?: () => void;
}

export function FolderActions({ currentFolderId, onFolderCreated }: FolderActionsProps) {
    const [isCreating, setIsCreating] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const router = useRouter();

    const handleCreateFolder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newFolderName.trim()) return;

        try {
            const result = await createFolder(newFolderName, currentFolderId);
            if (result.success) {
                setNewFolderName("");
                setIsCreating(false);
                onFolderCreated?.();
                router.refresh();
            } else {
                alert(result.error || "Failed to create folder");
            }
        } catch (error) {
            console.error("Error creating folder:", error);
            alert("Failed to create folder");
        }
    };

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
        <div className="flex items-center gap-2 mb-4">
            {isCreating ? (
                <form onSubmit={handleCreateFolder} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        placeholder="New folder name"
                        className="px-3 py-2 border rounded-md text-white bg-primary/90"
                        autoFocus
                    />
                    <Button type="submit">Create</Button>
                    <Button
                        variant="destructive"
                        type="button"
                        onClick={() => {
                            setIsCreating(false);
                            setNewFolderName("");
                        }}
                    >
                        Cancel
                    </Button>
                </form>
            ) : (
                <Button onClick={() => setIsCreating(true)}>New Folder</Button>
            )}
        </div>
    );
} 