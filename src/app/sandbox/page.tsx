import { mockFiles, mockFolders } from "~/lib/mock-data";
import { db } from "../../server/db";
import { files, folders } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export default async function SandBoxPage() {
    const user = await auth();
    if (!user.userId) throw new Error("Unauthorized");
    const foldersDB = db.select().from(folders).where(
        eq(folders.ownerId, user.userId)
    );
    console.log(foldersDB);
    return (
        <div>
            Seed Function
            <form
                action={
                    async () => {
                        "use server";
                        console.log("Sup Nerds");
                        // const user = await auth();
                        // if (!user.userId) throw new Error("Unauthorized");

                        const rootFolder = await db.insert(folders).values({
                            name: "Root",
                            ownerId: user.userId,
                            parent: null,
                        }).$returningId();

                        const insertFolders = mockFolders.map((folder, index) => ({

                            name: folder.name,
                            parent: rootFolder[0]!.id,
                            ownerId: user.userId,
                        }));

                        const folderData = await db.insert(folders).values(insertFolders);
                        console.log(folderData);

                    }
                }>
                <button type="submit">
                    Seed
                </button>
            </form>
        </div>

    )
}