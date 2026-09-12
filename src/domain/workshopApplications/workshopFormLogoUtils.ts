export const isSupportedLogoMimeType = (mimeType: string, acceptedMimeTypes: readonly string[]) =>
  acceptedMimeTypes.includes(mimeType);

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

export interface PrepareLogoOptions {
  acceptedMimeTypes: readonly string[];
  maxBytes: number;
  maxDimension: number;
}

export type LogoRejectionReason = 'unsupportedFormat' | 'tooLarge' | 'readFailed';

export type PrepareLogoResult =
  | { status: 'ready'; logo: PreparedLogo }
  | { status: 'rejected'; reason: LogoRejectionReason; cause?: unknown };

export const prepareLogoForUpload = async (
  file: File,
  { acceptedMimeTypes, maxBytes, maxDimension }: PrepareLogoOptions
): Promise<PrepareLogoResult> => {
  if (!isSupportedLogoMimeType(file.type, acceptedMimeTypes)) {
    return { status: 'rejected', reason: 'unsupportedFormat' };
  }

  if (file.size > maxBytes) {
    return { status: 'rejected', reason: 'tooLarge' };
  }

  try {
    const originalDataUrl = await readFileAsDataUrl(file);
    const downscaled = await downscaleDataUrl(originalDataUrl, maxDimension);

    return { status: 'ready', logo: downscaled ?? { dataUrl: originalDataUrl, mimeType: file.type } };
  } catch (cause) {
    return { status: 'rejected', reason: 'readFailed', cause };
  }
};
