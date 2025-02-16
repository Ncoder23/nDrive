"use server";

import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { files } from "./db/schema";
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