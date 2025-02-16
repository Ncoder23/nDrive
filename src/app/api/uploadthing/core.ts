import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { MUTATIONS, QUERIES } from "~/server/db/quries";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    driveUploader: f({
        blob: {
            /**
             * For full list of options and defaults, see the File Route API reference
             * @see https://docs.uploadthing.com/file-routes#route-config
             */
            maxFileSize: "4MB",
            maxFileCount: 100,
        },
    }).input(
        z.object({
            folderId: z.number(),
        }),
    )
        // Set permissions and file types for this FileRoute
        .middleware(async ({ input }) => {
            // This code runs on your server before upload
            const user = await auth();

            // If you throw, the user will not be able to upload
            if (!user.userId) throw new UploadThingError("Unauthorized");
            const parentFolder = await QUERIES.getFolderById(input.folderId, user.userId);
            const parentId = parentFolder;

            if (!parentId) throw new UploadThingError("Folder not found");
            if (parentId.ownerId !== user.userId) throw new UploadThingError("Unauthorized");
            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: user.userId, parentId: parentFolder };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log("Upload complete for userId:", metadata.userId);

            console.log("file url", file.url);
            await MUTATIONS.createFile({
                file: {
                    name: file.name,
                    size: file.size,
                    url: file.url,
                    type: file.type,
                    parent: metadata.parentId.id, // For now, all files are in the root folder
                    // For now, all files are in the root folder
                },
                ownerId: metadata.userId,
            });
            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
