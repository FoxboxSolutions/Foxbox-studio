
export enum AIModel {
  FLASH = 'gemini-2.5-flash-image-preview',
  PRO = 'gemini-3-pro-image-preview'
}

export enum AspectRatio {
  SQUARE = '1:1',
  LANDSCAPE = '16:9',
  PORTRAIT = '9:16',
  CINEMATIC = '21:9'
}

export type ImageSize = '1K' | '2K' | '4K';

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  model: AIModel;
  timestamp: number;
  aspectRatio: AspectRatio;
  size: ImageSize;
}

export interface GenerationGroup {
  id: string;
  prompt: string;
  images: GeneratedImage[];
  timestamp: number;
}

export interface GenerationParams {
  prompt: string;
  model: AIModel;
  aspectRatio: AspectRatio;
  imageSize: ImageSize;
  base64Image?: string;
  imageCount: number;
}
