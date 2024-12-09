import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import sharp from "sharp";
import connectDB from "@/lib/connectDB";
import Configuration from "@/models/configuration.model";
const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "32MB" } })
        .input(z.object({ configId: z.string().optional() }))
        .middleware(async ({ input }) => {
            return { input }
        })
        .onUploadComplete(async ({ metadata, file }) => {
            const { configId } = metadata.input

            const res = await fetch(file.url);
            const buffer = await res.arrayBuffer();

            const imageMetaData = await sharp(buffer).metadata();
            const { width, height } = imageMetaData;
            if (!configId) {
                await connectDB();
                const configuration = new Configuration({
                    imageUrl: file.url,
                    height: height || 500,
                    width: width || 500,
                })
                await configuration.save();
                return { configId: configuration._id };
            }
            else {
                const updatedConfiguration = await Configuration.findByIdAndUpdate(configId, {
                    croppedImageUrl: file.url,
                })
                return { configId: updatedConfiguration?._id }
            }
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;