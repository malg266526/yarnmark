export class LogoTooLargeError extends Error {
  constructor() {
    super('Selected logo file exceeds the maximum allowed size.');
    this.name = 'LogoTooLargeError';
  }
}

const DOWNSCALE_OUTPUT_MIME_TYPE = 'image/webp';
const DOWNSCALE_OUTPUT_QUALITY = 0.85;

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

const downscaleDataUrl = async (
  dataUrl: string,
  maxDimension: number
): Promise<{ dataUrl: string; mimeType: string } | null> => {
  const image = await dataUrlToImage(dataUrl);
  const longestSide = Math.max(image.naturalWidth, image.naturalHeight);

  if (longestSide <= maxDimension) {
    return null;
  }

  const scale = maxDimension / longestSide;
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

export const prepareLogoForUpload = async (
  file: File,
  maxBytes: number,
  maxDimension: number
): Promise<PreparedLogo> => {
  if (file.size > maxBytes) {
    throw new LogoTooLargeError();
  }

  const originalDataUrl = await readFileAsDataUrl(file);
  const downscaled = await downscaleDataUrl(originalDataUrl, maxDimension);

  if (downscaled) {
    return downscaled;
  }

  return { dataUrl: originalDataUrl, mimeType: file.type || 'image/png' };
};
