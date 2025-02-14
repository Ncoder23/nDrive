import {db} from "~/server/db"
import {files as FileSchema, folders as FolderSchema} from "~/server/db/schema"
import DriveContents from "~/app/drive-contents";

export default async function GoogleDriveClone() {
  const files = await db.select().from(FileSchema);
  const folders = await db.select().from(FolderSchema);

return (
  <DriveContents files={files} folders={folders} />
)  
}

