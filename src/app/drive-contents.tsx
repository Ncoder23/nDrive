"use client"

// import { useMemo, useState } from "react"

import { ChevronRight } from "lucide-react"

import { FileRow, FolderRow } from "./file-row"
import type { files, folders } from "~/server/db/schema"
import Link from "next/link"
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { UploadButton } from "~/components/uploadthing"
import { useRouter } from "next/navigation"

export default function DriveContents(props: {
  files: typeof files.$inferSelect[];
  folders: typeof folders.$inferSelect[];
  parents: typeof folders.$inferSelect[];
  currentFolderId: number;
}) {

  const navigate = useRouter();
  //const [currentFolder, setCurrentFolder] = useState<number>(1)

  // const getCurrentFiles = () => {
  //   return mockFiles.filter((file) => file.parent === currentFolder)
  // }
  // const getCurrentFolders = () => {
  //   return mockFolders.filter((folder) => folder.parent === currentFolder)
  // }

  // const handleFolderClick = (folderId: number) => {
  //   setCurrentFolder(folderId)
  // }
  // const breadcrumbs = useMemo(() => {
  //   const breadcrumbs = []
  //   let currentId = currentFolder

  //   while (currentId !== 1) {
  //     const folder = props.folders.find((file) => file.id === currentId)
  //     if (folder) {
  //       breadcrumbs.unshift(folder)
  //       currentId = folder.parent ?? 1
  //     } else {
  //       break
  //     }
  //   }

  //   return breadcrumbs
  // }, [currentFolder, props.folders])



  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link
              href="/f/1"

              className="text-gray-300 hover:text-white mr-2"
            >
              My Drive
            </Link>
            {props.parents.map((folder, _) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href={`/f/${folder.id}`}

                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          {/* <Button onClick={handleUpload} className="bg-blue-600 text-white hover:bg-blue-700">
            <Upload className="mr-2" size={20} />
            Upload
          </Button> */}
        </div>
        <div className="bg-gray-800 rounded-lg shadow-xl">
          <div className="px-6 py-4 border-b border-gray-700">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-3">Type</div>
            </div>
          </div>
          <ul>
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} handleFileClick={() => {
                alert("File clicked")
              }} />
            ))}
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder}
              />
            ))}
          </ul>
        </div>
        <UploadButton endpoint='driveUploader' onClientUploadComplete={() => {
          navigate.refresh();
        }}
          input={{ folderId: props.currentFolderId }}
        />
      </div>
    </div>
  )
}

