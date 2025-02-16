# 🚀 nDrive

A **Google Drive-inspired** file management system built using the **T3 Stack** with **TypeScript, Tailwind, and ShadCN**.
---

## TODO

- [x] Set up database and data model
- [x] Move folder open state to URL
- [x] Add auth
- [x] Add file uploading
- [x] Add analytics
- [x] Make sure sort order is consistent
- [x] Real homepage + onboarding
- [ ] Add delete

## Fun follow ups

### Folder deletions

Make sure you fetch all of the folders that have it as a parent, and their children too

### Folder creations

Make a server action that takes a name and parentId, and creates a folder with that name and parentId (don't forget to set the ownerId).

### Access control

Check if user is owner before showing the folder page.

### Make a "file view" page

You get the idea. Maybe check out my last tutorial?

### Toasts!

### Gray out a row while it's being deleted
---

## 📌 Tech Stack
- **Framework**: Next.js (T3 Stack)  
- **Styling**: TailwindCSS + ShadCN  
- **State Management**: Zustand  
- **Icons**: Lucide-react  
- **Package Manager**: pnpm  

---

## 🎯 Features
- 📁 **Folder & File Structure** (Mock Data)  
- 🧭 **Breadcrumb Navigation**  
- 🌙 **Dark Mode (Toggle)**  
- 📤 **Upload Button (Placeholder)**  

---

## 🛠️ Getting Started

### 1️⃣ Install dependencies  
```sh
pnpm install
```

### 2️⃣ Run the development server  
```sh
pnpm dev
```

### 3️⃣ Build the project  
```sh
pnpm build
```

Let me know if you need any modifications! 🚀
