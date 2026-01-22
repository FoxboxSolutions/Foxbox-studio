
import { AIModel, AspectRatio } from './types';

export const MODELS = [
  {
    id: AIModel.FLASH,
    name: 'Nano Banana Flash',
    description: 'State-of-the-art, low-latency model for quick experimentation.',
    isPro: false,
  },
  {
    id: AIModel.PRO,
    name: 'Nano Banana Pro',
    description: 'Sharp text, real-world knowledge, and deep reasoning capabilities.',
    isPro: true,
  },
];

export const ASPECT_RATIOS = [
  { label: '1:1', value: AspectRatio.SQUARE },
  { label: '16:9', value: AspectRatio.LANDSCAPE },
  { label: '9:16', value: AspectRatio.PORTRAIT },
];

export const INITIAL_PROMPTS = [
  "A futuristic cyberpunk cityscape with neon lights reflecting on wet pavement, cinematic lighting",
  "An ethereal forest with floating glowing lanterns and misty atmosphere, hyper-realistic",
  "A majestic fox sculpted from liquid gold, floating in a dark cosmic void",
  "Close-up portrait of an astronaut with a garden growing inside their helmet, surrealism"
];
