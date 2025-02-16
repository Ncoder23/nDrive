import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
    title: "nDrive",
    description: "It's like Google Drive, but not by Google!",
    icons: [{ rel: "icon", url: "/ndrive-logo.svg" }],
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <ClerkProvider>
            <html lang="en" className={`${GeistSans.variable}`}>
                <body>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}