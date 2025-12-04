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
  // ⚠️ IMPORTANT: Remplacez ces valeurs par vos vrais identifiants Cloudinary
  // 1. Allez sur cloudinary.com/console
  // 2. Notez votre Cloud Name (Dashboard)
  // 3. Créez un Upload Preset UNSIGNED dans Settings > Upload
  const CLOUDINARY_CLOUD_NAME = "dvzfebhyf"; // ← Remplacez ici
  const CLOUDINARY_UPLOAD_PRESET = "preset-key"; // ← Remplacez ici

  // Validation des identifiants
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET || CLOUDINARY_CLOUD_NAME === "YOUR_CLOUD_NAME" || CLOUDINARY_UPLOAD_PRESET === "YOUR_UPLOAD_PRESET") {
    throw new Error(
      "⚠️ Configuration Cloudinary manquante ! Veuillez configurer CLOUDINARY_CLOUD_NAME et CLOUDINARY_UPLOAD_PRESET dans src/lib/uploadFile.ts"
    );
  }

  // Validation du fichier
  if (!file || !(file instanceof File)) {
    throw new Error("Le fichier fourni n'est pas valide");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

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

      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`);
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
