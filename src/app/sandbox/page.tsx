import { mockFiles, mockFolders } from "~/lib/mock-data";
import {db} from "../../server/db";
import { files, folders } from "~/server/db/schema";

export default function SandBoxPage(){
    return (
        <div>
            Seed Function 
            <form
            action={
                async () => {
                    "use server";
                    console.log("Sup Nerds");
                    const folderData = await db.insert(folders).values(
                        mockFolders.map((folder, index) => ({
                            id: index + 1,
                            name: folder.name,
                            parent: index !== 0? 1: null,
                        })),
                    );
                    console.log(folderData);

                    const fileData = await db.insert(files).values(
                        mockFiles.map((file, index)=>({
                            id:index+1,
                            name:file.name,
                            size:100,
                            url:file.url,
                            type:file.type,
                            parent: (index%3)+1,
                        })),
                    );
                    console.log(fileData);
                }
            }>
                <button type="submit">
                Seed
                </button>
            </form>
        </div>

    )
}