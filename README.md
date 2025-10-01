# @gamebuddies/webcam-kit

> **Complete WebRTC Video Chat System with AI Enhancements**
>
> Professional webcam integration for React games with virtual backgrounds, face avatars, and noise suppression.

[![npm version](https://img.shields.io/npm/v/@gamebuddies/webcam-kit.svg)](https://www.npmjs.com/package/@gamebuddies/webcam-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- 🎥 **WebRTC Video/Audio** - Real-time P2P communication
- 🎨 **AI Virtual Backgrounds** - MediaPipe-powered background replacement
- 🔇 **Noise Suppression** - Krisp-like audio enhancement
- 👤 **3D Face Avatars** - Real-time facial tracking with Three.js
- 🎛️ **Device Management** - Camera/microphone selection
- 📱 **Mobile Support** - Fully responsive design
- 🧩 **Adapter Pattern** - Works with Zustand, Redux, Context API
- 🎨 **Customizable** - Tailwind CSS or plain CSS

---

## 📦 Installation

```bash
npm install @gamebuddies/webcam-kit
```

### Install Peer Dependencies

```bash
npm install react react-dom socket.io-client
```

### Setup Assets (Required for AI Features)

Copy WASM files and AI models to your public folder:

```bash
npm run setup-assets
```

Or manually run:

```bash
npx @gamebuddies/webcam-kit setup-assets
```

This copies ~22MB of WASM files and AI models to `public/wasm` and `public/models`.

---

## 🚀 Quick Start

### 1. Choose Your State Management

#### Option A: Zustand (Recommended)

```typescript
import { create } from 'zustand';
import io from 'socket.io-client';

const useGameStore = create((set) => ({
  socket: io('http://localhost:3001'),
  userId: 'player-123',
  roomCode: 'GAME-001',
  // ... your game state
}));
```

#### Option B: React Context

```typescript
import { createContext } from 'react';
import io from 'socket.io-client';

const GameContext = createContext({
  socket: io('http://localhost:3001'),
  userId: 'player-123',
  roomCode: 'GAME-001',
  // ... your game state
});
```

### 2. Create an Adapter

```typescript
import { createZustandAdapter } from '@gamebuddies/webcam-kit';
// or: import { createContextAdapter } from '@gamebuddies/webcam-kit';

const webcamConfig = createZustandAdapter(useGameStore);
// or: const webcamConfig = createContextAdapter(gameContextValue);
```

### 3. Wrap Your App

```tsx
import { WebRTCProvider, WebcamDisplay } from '@gamebuddies/webcam-kit';
import '@gamebuddies/webcam-kit/dist/style.css';

function App() {
  return (
    <WebRTCProvider config={webcamConfig}>
      <YourGame />
      <WebcamDisplay />
    </WebRTCProvider>
  );
}
```

### 4. Setup Signaling Server

```javascript
// server/index.js
const io = require('socket.io')(3001);

io.on('connection', (socket) => {
  socket.on('join-room', ({ roomCode, userId }) => {
    socket.join(roomCode);
    socket.to(roomCode).emit('user-connected', userId);
  });

  socket.on('webrtc:offer', ({ to, from, offer }) => {
    io.to(to).emit('webrtc:offer', { from, offer });
  });

  socket.on('webrtc:answer', ({ to, from, answer }) => {
    io.to(to).emit('webrtc:answer', { from, answer });
  });

  socket.on('webrtc:ice-candidate', ({ to, from, candidate }) => {
    io.to(to).emit('webrtc:ice-candidate', { from, candidate });
  });
});
```

---

## 🎨 Customization

### Configure Asset Paths

```typescript
const webcamConfig = createZustandAdapter(useGameStore, {
  assetPaths: {
    wasmPath: '/custom/wasm',
    modelsPath: '/custom/models'
  }
});
```

### Use Plain CSS (No Tailwind)

```tsx
import '@gamebuddies/webcam-kit/dist/webcam-plain.css';
```

### Custom Styling

```typescript
const webcamConfig = createZustandAdapter(useGameStore, {
  containerClassName: 'my-custom-webcam-container',
  compactMode: true,
  maxVideoFeeds: 4
});
```

---

## 🔌 API Reference

### Components

#### `WebRTCProvider`
Main context provider for webcam functionality.

```tsx
<WebRTCProvider config={webcamConfig}>
  {children}
</WebRTCProvider>
```

#### `WebcamDisplay`
Full-featured video chat UI component.

```tsx
<WebcamDisplay />
```

#### `MediaControls`
Simple audio/video controls (optional).

```tsx
<MediaControls />
```

### Adapters

#### `createZustandAdapter(useStore, options?)`
Creates config for Zustand-based apps.

#### `createReduxAdapter(store, options?)`
Creates config for Redux-based apps.

#### `createContextAdapter(contextValue, options?)`
Creates config for Context API-based apps.

### Hooks

#### `useWebRTC()`
Access WebRTC state and controls.

```tsx
const { localStream, remoteStreams, toggleWebcam, toggleMicrophone } = useWebRTC();
```

---

## 📖 Examples

### Full Example with Game Features

```tsx
import { create } from 'zustand';
import io from 'socket.io-client';
import {
  WebRTCProvider,
  WebcamDisplay,
  createZustandAdapter
} from '@gamebuddies/webcam-kit';
import '@gamebuddies/webcam-kit/dist/style.css';

// Your game store
const useGameStore = create((set) => ({
  socket: io('http://localhost:3001'),
  userId: 'player-123',
  roomCode: 'GAME-001',
  userRole: 'player',
  players: [
    { id: 'player-123', name: 'Alice', lives: 3 },
    { id: 'player-456', name: 'Bob', lives: 2 }
  ],
  currentTurnPlayer: 'player-123'
}));

// Create adapter with game features
const webcamConfig = createZustandAdapter(useGameStore, {
  showLives: true,
  getLivesForPlayer: (playerId) => {
    const player = useGameStore.getState().players.find(p => p.id === playerId);
    return player?.lives || 0;
  },
  showTurnIndicators: true,
  getCurrentTurnPlayer: () => useGameStore.getState().currentTurnPlayer
});

function Game() {
  return (
    <WebRTCProvider config={webcamConfig}>
      <div className="game-container">
        <YourGameBoard />
        <WebcamDisplay />
      </div>
    </WebRTCProvider>
  );
}
```

---

## 🌐 Browser Support

| Feature | Chrome/Edge | Firefox | Safari |
|---------|-------------|---------|--------|
| Basic Video/Audio | ✅ 94+ | ✅ 90+ | ✅ 15.4+ |
| Virtual Backgrounds | ✅ 94+ | ❌ | ❌ |
| Noise Suppression | ✅ | ✅ | ✅ |
| Face Avatars | ✅ 94+ | ❌ | ❌ |

> **Note**: Virtual backgrounds and avatars require MediaStreamTrackProcessor API (Chrome/Edge only)

---

## 📄 License

MIT © GameBuddies Team

---

## 🤝 Contributing

Contributions welcome! Please check our [issues](https://github.com/ennuiii/GameBuddiesWebcamIntegratinKit/issues) or submit a PR.

---

## 🔗 Links

- [GitHub Repository](https://github.com/ennuiii/GameBuddiesWebcamIntegratinKit)
- [npm Package](https://www.npmjs.com/package/@gamebuddies/webcam-kit)
- [Report Issues](https://github.com/ennuiii/GameBuddiesWebcamIntegratinKit/issues)
