import type { files, folders } from "~/server/db/schema"

import { Folder as FolderIcon, File as FileIcon, Trash2Icon } from "lucide-react"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import { deleteFile } from "~/server/actions"

export function FileRow(props: { file: typeof files.$inferSelect, handleFileClick: () => void }) {
  const { file, handleFileClick } = props
  return (
    <li key={file.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-750">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-6 flex items-center">

          <a href={file.url ?? "#"}
            className="flex items-center text-gray-100 hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleFileClick}
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </a>

        </div>
        <div className="col-span-2 text-gray-400">{file.size}</div>
        <div className="col-span-3 text-gray-400">{file.type}</div>
        <div className="col-span-1 text-gray-400">
          <Button
            variant="ghost"
            onClick={() => deleteFile(file.id)}
            aria-label="Delete file"
          >
            <Trash2Icon size={20} />
          </Button>
        </div>
      </div>
    </li>
  )
}

export function FolderRow(props: { folder: typeof folders.$inferSelect }) {
  const { folder } = props
  return (
    <li key={folder.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-750">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-6 flex items-center">

          <Link
            href={`/f/${folder.id}`}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </Link>

        </div>
        <div className="col-span-3 text-gray-400"></div>
        <div className="col-span-3 text-gray-400"></div>
      </div>
    </li>
  )
}
