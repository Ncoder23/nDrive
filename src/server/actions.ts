"use server";

import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { files, folders } from "./db/schema";
import { auth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";

const utApi = new UTApi();

export async function deleteFile(fileId: number) {

    const session = await auth();
    if (!session.userId) {
        return { error: "Unauthorized" };
    }

    const [file] = await db
        .select()
        .from(files)
        .where(
            and(eq(files.id, fileId), eq(files.ownerId, session.userId)),
        );

    if (!file) {
        return { error: "File not found" };
    }

    const utapiResult = await utApi.deleteFiles([
        file.url.replace("https://utfs.io/f/", ""),
    ]);

    console.log(utapiResult);

    const dbDeleteResult = await db
        .delete(files)
        .where(eq(files.id, fileId));

    console.log(dbDeleteResult);

    const c = await cookies();

    c.set("force-refresh", JSON.stringify(Math.random()));

    return { success: true };
}

export async function createFolder(name: string, parentId: number | null = null) {
    const session = await auth();
    if (!session.userId) {
        return { error: "Unauthorized" };
    }

    try {
        await db
            .insert(folders)
            .values({
                name,
                ownerId: session.userId,
                parent: parentId,
            });

        // Get the created folder data using a simpler query
        const [createdFolder] = await db
            .select()
            .from(folders)
            .where(
                and(
                    eq(folders.name, name),
                    eq(folders.ownerId, session.userId)
                )
            )
            .orderBy(folders.id)
            .limit(1);

        if (!createdFolder) {
            return { error: "Failed to create folder" };
        }

        const c = await cookies();
        c.set("force-refresh", JSON.stringify(Math.random()));

        return { 
            success: true, 
            folder: {
                id: createdFolder.id,
                name: createdFolder.name,
                parent: createdFolder.parent
            }
        };
    } catch (error) {
        console.error("Error creating folder:", error);
        return { error: "Failed to create folder" };
    }
}

export async function deleteFolder(folderId: number) {
    const session = await auth();
    if (!session.userId) {
        return { error: "Unauthorized" };
    }

    try {
        // First, check if the folder exists and belongs to the user
        const [folder] = await db
            .select()
            .from(folders)
            .where(
                and(eq(folders.id, folderId), eq(folders.ownerId, session.userId))
            );

        if (!folder) {
            return { error: "Folder not found" };
        }

        // Delete all files in the folder
        await db
            .delete(files)
            .where(
                and(eq(files.parent, folderId), eq(files.ownerId, session.userId))
            );

        // Delete all subfolders recursively
        const deleteSubfolders = async (parentId: number) => {
            const subfolders = await db
                .select()
                .from(folders)
                .where(
                    and(eq(folders.parent, parentId), eq(folders.ownerId, session.userId))
                );

            for (const subfolder of subfolders) {
                await deleteSubfolders(subfolder.id);
                await db
                    .delete(folders)
                    .where(eq(folders.id, subfolder.id));
            }
        };

        await deleteSubfolders(folderId);

        // Finally, delete the folder itself
        await db
            .delete(folders)
            .where(eq(folders.id, folderId));

        const c = await cookies();
        c.set("force-refresh", JSON.stringify(Math.random()));

        return { success: true };
    } catch (error) {
        console.error("Error deleting folder:", error);
        return { error: "Failed to delete folder" };
    }
}