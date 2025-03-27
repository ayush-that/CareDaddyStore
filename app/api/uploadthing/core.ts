import { createUploadthing, type FileRouter } from 'uploadthing/next';
const f = createUploadthing();
export const ourFileRouter = {
  paymentProofUploader: f({ image: { maxFileSize: '4MB' }, pdf: { maxFileSize: '4MB' } })
    .middleware(async () => {
      return { uploadedBy: 'user' };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.uploadedBy, fileUrl: file.url };
    }),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;
