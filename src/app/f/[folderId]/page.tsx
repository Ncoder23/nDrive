import DriveContents from "~/app/drive-contents";
import { QUERIES } from "~/server/db/quries";


export default async function GoogleDriveClone(props: {
    params: Promise<{ folderId: string }>;
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
        QUERIES.getFiles(parsedFolderId),
        QUERIES.getFolders(parsedFolderId),
        QUERIES.getAllParents(parsedFolderId),
    ]);

    return (
        <DriveContents files={files} folders={folders} parents={parents} />
    )
}

