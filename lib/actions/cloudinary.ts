"use server";

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  secure: true,
});

export async function uploadImageToCloudinaryAction(base64Data: string, filename: string): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const result = await cloudinary.uploader.upload(base64Data, {
      folder: 'qr-menu',
      public_id: filename,
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
        { width: 1200, height: 1200, crop: 'limit' },
      ],
    });

    return {
      success: true,
      url: result.secure_url,
    };
  } catch (error) {
    console.error('Failed to upload image to Cloudinary:', error);
    return {
      success: false,
      error: 'Failed to upload image',
    };
  }
}
