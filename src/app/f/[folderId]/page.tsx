import { db } from "~/server/db"
import { files as FileSchema, folders as FolderSchema } from "~/server/db/schema"
import DriveContents from "~/app/drive-contents";
import { eq } from "drizzle-orm";
export default async function GoogleDriveClone(props: {
    params: Promise<{ folderId: string }>;
}) {
    const params = await props.params;
    const parsedFolderId = parseInt(params.folderId);
    if (isNaN(parsedFolderId)) {
        return <div>Invalid folder ID</div>;
    }

    const files = await db.select().from(FileSchema).where(
        eq(FileSchema.parent, parsedFolderId)
    );
    const folders = await db.select().from(FolderSchema).where(
        eq(FolderSchema.parent, parsedFolderId)
    );

    return (
        <DriveContents files={files} folders={folders} />
    )
}

