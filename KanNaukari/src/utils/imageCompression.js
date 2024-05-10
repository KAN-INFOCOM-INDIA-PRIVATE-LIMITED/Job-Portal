import sharp from 'sharp';

export async function compressImage(imageBuffer) {
  try {
    const compressedImageBuffer = await sharp(imageBuffer)
      .resize({ width: 800, height: 600 }) // Resize the image if needed
      .jpeg({ quality: 80 }) // Adjust the quality as needed
      .toBuffer();

    return compressedImageBuffer;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
}
