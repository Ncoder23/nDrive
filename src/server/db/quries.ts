import { db } from "~/server/db"
import { files as FileSchema, folders as FolderSchema } from "~/server/db/schema"
import { eq } from "drizzle-orm";


const QUERIES = {

    getFiles: function (parsedFolderId: number) {
        return db.select().from(FileSchema).where(
            eq(FileSchema.parent, parsedFolderId)
        );
    },
    getFolders: function (parsedFolderId: number) {
        return db.select().from(FolderSchema).where(
            eq(FolderSchema.parent, parsedFolderId)
        );
    },
    getAllParents: async function (folderId: number) {
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

    }

};


export default QUERIES;
