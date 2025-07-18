import imageCompression from 'browser-image-compression';

export async function compressImage(file: File): Promise<File> {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
    };

    try {
        return await imageCompression(file, options);
    } catch (error) {
        console.error('Error saat kompresi gambar:', error);
        return file;
    }
}
