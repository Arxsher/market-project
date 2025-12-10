/**
 * Upload a file to Cloudinary
 * @param file - The file to upload
 * @param onProgress - Optional callback for upload progress
 * @returns The public URL of the uploaded file
 */
export async function uploadFile(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  // Cloudinary Configuration
  const CLOUDINARY_CLOUD_NAME = "dvzfebhyf";
  const CLOUDINARY_UPLOAD_PRESET = "preset-key";

  // Validation du fichier
  if (!file || !(file instanceof File)) {
    throw new Error("Le fichier fourni n'est pas valide");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  // Determine resource type based on file extension
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.tiff', '.svg'];
  const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
  const isImage = imageExtensions.includes(fileExtension);

  // Use /image/upload for images, /raw/upload for everything else (PDF, Word, Excel, DWG, ZIP, etc.)
  const resourceType = isImage ? 'image' : 'raw';
  const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;

  try {
    // Use XMLHttpRequest for progress tracking
    const response = await new Promise<Response>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const progress = Math.round((e.loaded / e.total) * 100);
          onProgress(progress);
        }
      });

      xhr.addEventListener('load', () => {
        resolve(new Response(xhr.responseText, {
          status: xhr.status,
          statusText: xhr.statusText,
        }));
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Erreur réseau lors de l\'upload'));
      });

      xhr.open('POST', uploadUrl);
      xhr.send(formData);
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error?.message || response.statusText;
      throw new Error(`Échec de l'upload Cloudinary: ${errorMessage}`);
    }

    if (!data.secure_url) {
      throw new Error("URL du fichier non reçue de Cloudinary");
    }

    return data.secure_url;
  } catch (error) {
    console.error("Erreur lors de l'upload du fichier:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erreur inconnue lors de l'upload");
  }
}

/**
 * Upload multiple files to Cloudinary
 * @param files - Array of files to upload
 * @param onFileProgress - Optional callback for individual file progress
 * @param onTotalProgress - Optional callback for total progress
 * @returns Array of public URLs
 */
export async function uploadMultipleFiles(
  files: File[],
  onFileProgress?: (fileIndex: number, fileName: string, progress: number) => void,
  onTotalProgress?: (totalProgress: number) => void
): Promise<string[]> {
  const results: string[] = [];
  let completedFiles = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const url = await uploadFile(file, (progress) => {
      onFileProgress?.(i, file.name, progress);

      // Calculate total progress
      const totalProgress = Math.round(
        ((completedFiles + progress / 100) / files.length) * 100
      );
      onTotalProgress?.(totalProgress);
    });

    results.push(url);
    completedFiles++;
    onTotalProgress?.(Math.round((completedFiles / files.length) * 100));
  }

  return results;
}
