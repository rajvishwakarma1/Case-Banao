"use client";

import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";

const Page = () => {
  const { toast } = useToast();
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const router = useRouter();
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`);
      });
    },
    onUploadProgress(p) {
      setUploadProgress(p);
    },
  });
  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    setIsDragOver(false);
    toast({
      title: `${file.file.type} is not supported.`,
      description: "Please upload a PNG, JPG, or JPEG file.",
      variant: "destructive",
    });
  };
  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: undefined });
    setIsDragOver(false);
  };
  const [isPending, startTransition] = useTransition();
  return (
    <main
      className={cn(
        "relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 dark:bg-gray-700 p-2 ring-1 ring-inset ring-gray-900/10 dark:ring-gray-700 lg:rounded-2xl flex justify-center flex-col items-center",
        {
          "ring-blue-900/25 bg-blue-900/10 dark:bg-slate-600 ring-slate-600":
            isDragOver,
        }
      )}
    >
      <div className="relative flex flex-1 flex-col items-center justify-center w-full cursor-pointer">
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            "image/png": [".png"],
            "image/jpg": [".jpg"],
            "image/jpeg": [".jpeg"],
          }}
          onDragEnter={() => {
            setIsDragOver(true);
          }}
          onDragLeave={() => {
            setIsDragOver(false);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="h-full w-full flex-1 flex flex-col items-center justify-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 dark:text-zinc-200 mb-2" />
              ) : isUploading || isPending ? (
                <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
              ) : (
                <Image className="h-6 w-6 text-zin-500 mb-2" />
              )}
              <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <p className="dark:text-zinc-200">Uploading...</p>
                    <Progress
                      value={uploadProgress}
                      className="mt-2 w-40 h-2 bg-gray-300"
                    />
                  </div>
                ) : isPending ? (
                  <div className="flex flex-col items-center">
                    <p className="dark:text-zinc-100">
                      Redirecting, please wait...
                    </p>
                  </div>
                ) : isDragOver ? (
                  <p className="dark:text-zinc-100">
                    <span className="font-semibold">Drop file</span> to upload
                  </p>
                ) : (
                  <p className="dark:text-zinc-100">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                )}
              </div>
              {!isPending && (
                <p className="text-xs text-zinc-500 dark:text-zinc-300">
                  PNG, JPG, JPEG
                </p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </main>
  );
};

export default Page;
