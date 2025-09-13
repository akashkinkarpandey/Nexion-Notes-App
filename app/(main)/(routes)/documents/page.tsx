"use client"

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" })
      .then(async (documentId) => {
        console.log("Created documentId:", documentId);
        await router.push(`/documents/${documentId}`);
        return true;
      })
      .catch((err) => {
        console.error("Error creating note:", err);
        throw err; 
      });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note."
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block bg-transparent"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Nexion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
}
 
export default DocumentsPage;