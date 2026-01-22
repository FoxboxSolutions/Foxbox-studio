
import { AIModel, GenerationParams } from "../types";

declare const puter: any;

export const generateAIImage = async (params: GenerationParams): Promise<string[]> => {
  if (typeof puter === 'undefined') {
    throw new Error("Puter.js is not loaded. Please check your internet connection.");
  }

  const { prompt, model, aspectRatio, imageSize, base64Image, imageCount } = params;
  
  const sizeMap: Record<string, number> = {
    '1K': 1024,
    '2K': 2048,
    '4K': 4096
  };
  const size = sizeMap[imageSize] || 1024;

  const options: any = {
    model: model,
    size: size,
    aspect_ratio: aspectRatio === '21:9' ? '16:9' : aspectRatio,
  };

  if (base64Image) {
    // Clean base64 prefix if present
    options.input_image = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;
    options.input_image_mime_type = 'image/png';
  }

  const generatedUrls: string[] = [];

  try {
    // Sequential generation to avoid session conflicts and Puter rate limit errors
    for (let i = 0; i < imageCount; i++) {
      const imgElement = await puter.ai.txt2img(prompt, options);
      
      if (imgElement && imgElement.src) {
        generatedUrls.push(imgElement.src);
      } else {
        throw new Error(`Generation failed for image ${i + 1}`);
      }
    }

    return generatedUrls;
    
  } catch (error: any) {
    console.error("Puter AI detailed error:", error);
    // Return a more explicit message if possible
    throw new Error(error?.message || "Communication error with Puter AI. Please check console logs.");
  }
};
