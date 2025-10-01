/**
 * GameBuddies Webcam Integration Kit
 * NPM Package Entry Point
 */

// Main Context and Provider
export { WebRTCProvider, useWebRTC } from './contexts/WebRTCContext';

// Components
export { WebcamDisplay } from './components/WebcamDisplay';
export { MediaControls } from './components/MediaControls';

// Configuration
export {
  useWebcamConfig,
  WebcamConfigProvider,
  createWebcamConfig
} from './config/WebcamConfig';
export type { WebcamConfig } from './config/WebcamConfig';

// Adapters
export { createZustandAdapter } from './config/adapters/zustand';
export { createReduxAdapter } from './config/adapters/redux';
export { createContextAdapter } from './config/adapters/context';

// Services (for advanced usage)
export { VirtualBackgroundService } from './services/virtualBackgroundService';
export { FaceAvatarService } from './services/faceAvatarService';
export { AudioProcessor } from './services/audioProcessor';

// Utilities
export { getTranslation } from './utils/translations';

// Locales
export { en } from './locales/en';
export { de } from './locales/de';
