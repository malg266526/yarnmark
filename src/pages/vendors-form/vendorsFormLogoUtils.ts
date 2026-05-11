const getFileExtensionFromMimeType = (mimeType: string) => {
  switch (mimeType) {
    case 'image/png':
      return 'png';
    case 'image/webp':
      return 'webp';
    case 'image/avif':
      return 'avif';
    case 'image/jpeg':
      return 'jpg';
    default:
      return 'png';
  }
};

const sanitizeFileStem = (filename: string | null, fallback: string) => {
  const rawStem = filename ? filename.replace(/\.[^.]+$/, '') : fallback;

  return (
    rawStem
      .trim()
      .replace(/[^a-zA-Z0-9-_]+/g, '-')
      .replace(/^-+|-+$/g, '') || fallback
  );
};

const dataUrlToImage = (dataUrl: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Unable to load image from stored data.'));
    image.src = dataUrl;
  });

const canvasToBlob = (canvas: HTMLCanvasElement, mimeType: string) =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error(`Browser does not support exporting this image as ${mimeType}.`));
        return;
      }

      resolve(blob);
    }, mimeType);
  });

export const readLogoFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('Unexpected file reader result.'));
        return;
      }

      resolve(reader.result);
    };

    reader.onerror = () => reject(reader.error ?? new Error('Failed to read the selected file.'));
    reader.readAsDataURL(file);
  });

export const getLogoDownloadFileName = (logoFileName: string | null, mimeType: string, fallbackStem: string) =>
  `${sanitizeFileStem(logoFileName, fallbackStem)}.${getFileExtensionFromMimeType(mimeType)}`;

export const downloadStoredLogo = async ({
  dataUrl,
  preferredMimeType,
  logoFileName,
  fallbackStem
}: {
  dataUrl: string;
  preferredMimeType: 'image/png' | 'image/webp' | 'image/avif';
  logoFileName: string | null;
  fallbackStem: string;
}) => {
  const image = await dataUrlToImage(dataUrl);
  const canvas = document.createElement('canvas');

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Canvas context is not available.');
  }

  context.drawImage(image, 0, 0);

  const blob = await canvasToBlob(canvas, preferredMimeType);
  const objectUrl = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');

  downloadLink.href = objectUrl;
  downloadLink.download = getLogoDownloadFileName(logoFileName, preferredMimeType, fallbackStem);
  downloadLink.click();

  URL.revokeObjectURL(objectUrl);
};
