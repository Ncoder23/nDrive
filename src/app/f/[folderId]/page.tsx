import DriveContents from "~/app/f/[folderId]/drive-contents";
import { QUERIES } from "~/server/db/quries";


export default async function GoogleDriveClone(props: {
    params: Promise<{ folderId: string, ownerId: string }>;
}) {
    const params = await props.params;
    const parsedFolderId = parseInt(params.folderId);
    if (isNaN(parsedFolderId)) {
        return <div>Invalid folder ID</div>;
    }

    // const filesPromise = db.select().from(FileSchema).where(
    //     eq(FileSchema.parent, parsedFolderId)
    // );
    // const foldersPromise = db.select().from(FolderSchema).where(
    //     eq(FolderSchema.parent, parsedFolderId)
    // );

    // const parentsPromise = getAllParents(parsedFolderId);

    const [files, folders, parents] = await Promise.all([
        QUERIES.getFiles(parsedFolderId, params.ownerId),
        QUERIES.getFolders(parsedFolderId, params.ownerId),
        QUERIES.getAllParents(parsedFolderId, params.ownerId),
    ]);

    return (
        <DriveContents files={files} folders={folders} parents={parents} currentFolderId={
            parsedFolderId
        } />
    )
}

