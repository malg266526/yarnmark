import { VENDORS_FORM_LOGO_MAX_DIMENSION } from './vendorsFormConstants';

export class LogoTooLargeError extends Error {
  constructor() {
    super('Selected logo file exceeds the maximum allowed size.');
    this.name = 'LogoTooLargeError';
  }
}

const DOWNSCALE_OUTPUT_MIME_TYPE = 'image/webp';
const DOWNSCALE_OUTPUT_QUALITY = 0.85;

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

const canvasToBlob = (canvas: HTMLCanvasElement, mimeType: string, quality?: number) =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error(`Browser does not support exporting this image as ${mimeType}.`));
          return;
        }

        resolve(blob);
      },
      mimeType,
      quality
    );
  });

const blobToDataUrl = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('Unexpected file reader result.'));
        return;
      }

      resolve(reader.result);
    };

    reader.onerror = () => reject(reader.error ?? new Error('Failed to read encoded image.'));
    reader.readAsDataURL(blob);
  });

const downscaleDataUrl = async (dataUrl: string): Promise<{ dataUrl: string; mimeType: string } | null> => {
  const image = await dataUrlToImage(dataUrl);
  const longestSide = Math.max(image.naturalWidth, image.naturalHeight);

  if (longestSide <= VENDORS_FORM_LOGO_MAX_DIMENSION) {
    return null;
  }

  const scale = VENDORS_FORM_LOGO_MAX_DIMENSION / longestSide;
  const canvas = document.createElement('canvas');

  canvas.width = Math.round(image.naturalWidth * scale);
  canvas.height = Math.round(image.naturalHeight * scale);

  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Canvas context is not available.');
  }

  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const blob = await canvasToBlob(canvas, DOWNSCALE_OUTPUT_MIME_TYPE, DOWNSCALE_OUTPUT_QUALITY);
  const downscaledDataUrl = await blobToDataUrl(blob);

  return { dataUrl: downscaledDataUrl, mimeType: DOWNSCALE_OUTPUT_MIME_TYPE };
};

export interface PreparedLogo {
  dataUrl: string;
  mimeType: string;
}

const readFileAsDataUrl = (file: File) =>
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

export const prepareLogoForUpload = async (file: File, maxBytes: number): Promise<PreparedLogo> => {
  if (file.size > maxBytes) {
    throw new LogoTooLargeError();
  }

  const originalDataUrl = await readFileAsDataUrl(file);
  const downscaled = await downscaleDataUrl(originalDataUrl);

  if (downscaled) {
    return downscaled;
  }

  return { dataUrl: originalDataUrl, mimeType: file.type || 'image/png' };
};

export const getLogoDownloadFileName = (logoFileName: string | null, mimeType: string, fallbackStem: string) =>
  `${sanitizeFileStem(logoFileName, fallbackStem)}.${getFileExtensionFromMimeType(mimeType)}`;

const triggerDownload = (href: string, downloadName: string, revoke?: () => void) => {
  const downloadLink = document.createElement('a');

  downloadLink.href = href;
  downloadLink.download = downloadName;
  downloadLink.click();

  revoke?.();
};

export const downloadStoredLogo = async ({
  dataUrl,
  storedMimeType,
  preferredMimeType,
  logoFileName,
  fallbackStem
}: {
  dataUrl: string;
  storedMimeType: string | null;
  preferredMimeType: 'image/png' | 'image/webp' | 'image/avif';
  logoFileName: string | null;
  fallbackStem: string;
}) => {
  const downloadName = getLogoDownloadFileName(logoFileName, preferredMimeType, fallbackStem);

  if (storedMimeType === preferredMimeType) {
    triggerDownload(dataUrl, downloadName);
    return;
  }

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

  triggerDownload(objectUrl, downloadName, () => URL.revokeObjectURL(objectUrl));
};
