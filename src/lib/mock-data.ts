export interface File {
  id: string
  name: string
  type: "file"
  url?: string
  parent: string
  size?: string
}

export type Folder = {
  type:"folder",
  id:string,
  name:string,
  parent:string | null

}
export const mockFolders: Folder[] = [
  { id: "1", name: "Documents", type: "folder", parent: "root" },
  { id: "2", name: "Images", type: "folder", parent: "root" },
  { id: "3", name: "Work", type: "folder", parent: "root" },
  { id: "4", name: "Downloads", type: "folder", parent: "root" },
  { id: "5", name: "PDFs", type: "folder", parent: "1" },
  { id: "6", name: "Images", type: "folder", parent: "2" },

]
export const mockFiles: File[] = [
  { id: "1", name: "Resume.pdf", type: "file", parent: "root", url: "https://www.google.com", size: "100KB" },
  { id: "2", name: "Project Proposal.docx", type: "file", parent: "Documents" },
  { id: "3", name: "Vacation.jpg", type: "file", parent: "Images" },
  { id: "4", name: "Profile Picture.png", type: "file", parent: "Images" },
  { id: "5", name: "Presentation.pptx", type: "file", parent: "Work" },
  { id: "6", name: "Budget.xlsx", type: "file", parent: "Work" },
  
]

