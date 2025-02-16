import { db } from "~/server/db"

import { files as FileSchema, folders as FolderSchema } from "~/server/db/schema"
import { eq, and, isNull } from "drizzle-orm";


export const QUERIES = {

    getFiles: function (parsedFolderId: number, ownerId: string) {
        return db.select().from(FileSchema).where(
            eq(FileSchema.parent, parsedFolderId)
        ).orderBy(
            FileSchema.id
        );
    },
    getFolders: function (parsedFolderId: number, ownerId: string) {
        return db.select().from(FolderSchema).where(
            eq(FolderSchema.parent, parsedFolderId)
        ).orderBy(
            FolderSchema.id
        );
    },
    getAllParents: async function (folderId: number, ownerId: string) {
        const parents = [];
        let currentId: number | null = folderId;
        while (currentId !== null) {
            const folder = await db.select().from(FolderSchema).where(
                eq(FolderSchema.id, currentId)
            );
            if (!folder[0]) {
                throw new Error("Folder not found");
            }

            parents.unshift(folder[0]);
            currentId = folder[0].parent;
        }
        return parents;

    },
    getFolderById: async function (folderId: number, ownerId: string) {
        const folder = await db.select().from(FolderSchema).where(
            eq(FolderSchema.id, folderId)
        );
        return folder[0];
    },
    getRootFolderForUser: async function (userId: string) {
        const folder = await db.select().from(FolderSchema).where(
            and(eq(FolderSchema.ownerId, userId), isNull(FolderSchema.parent))
        );
        return folder[0];
    }

};

export const MUTATIONS = {

    createFile: async function (input: ({
        file: {
            name: string;
            size: number;
            url: string;
            type: string;
            parent: number;
        };
        ownerId: string;
    })) {
        return await db.insert(FileSchema).values({ ...input.file, ownerId: input.ownerId });
    },

    onboardUser: async function (userId: string) {
        const rootFolder = await db.insert(FolderSchema).values({
            name: "Root",
            ownerId: userId,
            parent: null,
        }).$returningId();
        const rootFolderId = rootFolder[0]!.id;
        await db.insert(FolderSchema).values([
            {
                name: "Images",
                ownerId: userId,
                parent: rootFolderId,
            },
            {
                name: "Documents",
                ownerId: userId,
                parent: rootFolderId,
            },
            {
                name: "Videos",
                ownerId: userId,
                parent: rootFolderId,
            },
            {
                name: "Music",
                ownerId: userId,
                parent: rootFolderId,
            },
            {
                name: "Other",
                parent: rootFolderId,
                ownerId: userId,
            }]);
        return rootFolderId;
    }
}
