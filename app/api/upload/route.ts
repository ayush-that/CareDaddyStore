import { NextResponse } from 'next/server';
import { mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const fileSize = file.size;
    const fileType = file.type;

    console.log('File details:', {
      name: file.name,
      size: fileSize,
      type: fileType,
    });

    if (fileSize > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    if (!fileType.startsWith('image/') && fileType !== 'application/pdf') {
      return NextResponse.json(
        { success: false, error: 'Only images and PDFs are allowed' },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      console.error('Error creating uploads directory:', error);
    }

    const timestamp = Date.now();
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const filename = `${timestamp}_${sanitizedFilename}`;

    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: fileUrl,
      name: file.name,
      size: fileSize,
      type: fileType,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to upload file',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
