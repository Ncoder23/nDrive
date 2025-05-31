import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";

export default async function HomePage() {
  const session = await auth();

  // If user is signed in, redirect to drive
  if (session.userId) {
    redirect("/drive");
  }

  return (
    <>
      <h1 className="mb-4 bg-gradient-to-r from-neutral-200 to-neutral-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
        nDrive
      </h1>
      <p className="mx-auto mb-8 max-w-md text-xl text-neutral-400 md:text-2xl">
        Secure, fast, and easy file storage for the modern web
      </p>
      <SignInButton mode="modal">
        <Button
          size="lg"
          className="border border-neutral-700 bg-neutral-800 text-white transition-colors hover:bg-neutral-700"
        >
          Get Started
        </Button>
      </SignInButton>
      <footer className="mt-16 text-sm text-neutral-500">
        © {new Date().getFullYear()} nDrive. All rights reserved.
      </footer>
    </>
  );
}