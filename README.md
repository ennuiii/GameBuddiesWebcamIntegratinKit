# DDF Webcam Integration Kit

> **Complete WebRTC Video Chat System with AI Enhancements**
>
> Ready-to-use package extracted from DDF Quiz Game

---

## What's Included

This kit contains everything you need to add professional video chat to your game:

✅ **WebRTC Video/Audio** - Real-time P2P communication
✅ **AI Virtual Backgrounds** - MediaPipe-powered background replacement
✅ **Noise Suppression** - Krisp-like audio enhancement
✅ **3D Face Avatars** - Real-time facial tracking with Three.js
✅ **Device Management** - Camera/microphone selection
✅ **Mobile Support** - Responsive design
✅ **Complete UI** - Pre-built components with full functionality

---

## 📦 Package Contents

```
webcam-integration-kit/
├── src/
│   ├── contexts/
│   │   └── WebRTCContext.tsx          # Core WebRTC management (1661 lines)
│   ├── components/
│   │   ├── WebcamDisplay.tsx          # Main UI component (1887 lines)
│   │   └── MediaControls.tsx          # Audio/video controls (326 lines)
│   ├── services/
│   │   ├── virtualBackgroundService.ts # AI background replacement (750 lines)
│   │   ├── audioProcessor.ts          # Audio enhancement (324 lines)
│   │   └── faceAvatarService.ts       # 3D avatar tracking (535 lines)
│   ├── utils/
│   │   └── translations.ts            # i18n helper
│   └── locales/
│       ├── en.ts                      # English translations
│       └── de.ts                      # German translations
├── public/
│   ├── wasm/                          # MediaPipe WASM files (4 files)
│   │   ├── vision_wasm_internal.js
│   │   ├── vision_wasm_internal.wasm
│   │   ├── vision_wasm_nosimd_internal.js
│   │   └── vision_wasm_nosimd_internal.wasm
│   └── models/                        # AI Models (3 files)
│       ├── selfie_segmenter.tflite   # For virtual backgrounds (~1MB)
│       ├── face_landmarker.task      # For face avatars (~6MB)
│       └── raccoon_head.glb          # Example 3D avatar (~500KB)
├── package.json                       # Dependencies list
└── README.md                          # This file
```

**Total Package Size**: ~50MB (mostly AI models)

---

## 🚀 Quick Installation

### Step 1: Copy Files to Your Project

```bash
# Copy the entire kit into your project
cp -r webcam-integration-kit/src/* your-game/client/src/
cp -r webcam-integration-kit/public/* your-game/client/public/
```

### Step 2: Install Dependencies

```bash
cd your-game/client
npm install @mediapipe/tasks-vision socket.io-client three lucide-react
npm install -D @types/three
```

### Step 3: Set Up State Management

The kit requires a Zustand store with socket.io. Add this to your store:

```typescript
// stores/unifiedStore.ts (or your state management)
import { create } from 'zustand'
import io from 'socket.io-client'

const socket = io('http://localhost:3001', {
  transports: ['websocket'],
  reconnection: true
})

export const useUnifiedStore = create((set) => ({
  socket: socket,
  userId: null,
  roomCode: null,
  userRole: 'player', // or 'gamemaster'
  room: null,
  language: 'en',
  hasVoted: false,

  // Add methods as needed
  submitVote: (playerId) => {
    // Your voting logic
  },
  updateMediaState: (isMicOn) => {
    // Your media state logic
  }
}))

export default useUnifiedStore
```

### Step 4: Wrap Your App with WebRTC Provider

```tsx
// App.tsx
import { WebRTCProvider } from './contexts/WebRTCContext'

function App() {
  return (
    <WebRTCProvider>
      <YourGameComponent />
    </WebRTCProvider>
  )
}
```

### Step 5: Add Webcam Component

```tsx
// YourGameComponent.tsx
import WebcamDisplay from './components/WebcamDisplay'

function YourGameComponent() {
  return (
    <div className="game-layout">
      <div className="game-content">
        {/* Your game UI */}
      </div>

      <div className="video-sidebar">
        <WebcamDisplay />
      </div>
    </div>
  )
}
```

### Step 6: Set Up Signaling Server

Add these socket handlers to your server:

```typescript
// server/socketHandlers.ts
io.on('connection', (socket) => {
  const videoEnabledPeers = new Map()
  const peerConnectionTypes = new Map()

  socket.on('webrtc:enable-video', ({ roomCode, peerId, connectionType }) => {
    // Add peer to video list
    if (!videoEnabledPeers.has(roomCode)) {
      videoEnabledPeers.set(roomCode, new Set())
    }
    videoEnabledPeers.get(roomCode).add(peerId)
    peerConnectionTypes.set(peerId, connectionType)

    // Notify all peers
    const peers = Array.from(videoEnabledPeers.get(roomCode) || [])
    const types = Object.fromEntries(
      peers.map(id => [id, peerConnectionTypes.get(id) || 'has-camera'])
    )

    io.to(roomCode).emit('webrtc:video-enabled-peers', { peers, peerConnectionTypes: types })
    socket.to(roomCode).emit('webrtc:peer-enabled-video', { peerId, connectionType })
  })

  socket.on('webrtc:disable-video', ({ roomCode, peerId }) => {
    videoEnabledPeers.get(roomCode)?.delete(peerId)
    socket.to(roomCode).emit('webrtc:peer-disabled-video', { peerId })
  })

  socket.on('webrtc:offer', ({ toPeerId, offer }) => {
    io.to(toPeerId).emit('webrtc:offer', { fromPeerId: socket.id, offer })
  })

  socket.on('webrtc:answer', ({ toPeerId, answer }) => {
    io.to(toPeerId).emit('webrtc:answer', { fromPeerId: socket.id, answer })
  })

  socket.on('webrtc:ice-candidate', ({ toPeerId, candidate }) => {
    io.to(toPeerId).emit('webrtc:ice-candidate', { fromPeerId: socket.id, candidate })
  })

  socket.on('disconnect', () => {
    videoEnabledPeers.forEach((peers, roomCode) => {
      if (peers.has(socket.id)) {
        peers.delete(socket.id)
        io.to(roomCode).emit('webrtc:peer-left', { peerId: socket.id })
      }
    })
  })
})
```

**That's it!** 🎉 You now have full video chat working.

---

## 🎨 Styling

The components use Tailwind CSS classes. Make sure Tailwind is configured in your project:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Or add equivalent CSS for the classes used in the components.

---

## ⚙️ Configuration

### Minimal Setup (Video Only)

If you only want basic video chat without AI features, you can skip installing:
- MediaPipe packages
- WASM files
- Model files
- Avatar files

And remove the AI service imports from `WebRTCContext.tsx`.

### Full Setup (All Features)

To enable all features, ensure:
1. All dependencies are installed
2. WASM files are in `public/wasm/`
3. Model files are in `public/models/`
4. Avatar GLB files are in `public/models/`

### Custom Avatars

Add your own 3D avatars:
1. Create GLB file with morph targets for ARKit blendshapes
2. Place in `public/models/your_avatar.glb`
3. Update avatar selection in settings modal

---

## 🎮 Usage Examples

### Basic Usage

```tsx
import { useWebRTC } from './contexts/WebRTCContext'

function GameLobby() {
  const { enableVideoChat, isVideoEnabled } = useWebRTC()

  return (
    <button onClick={enableVideoChat}>
      {isVideoEnabled ? 'Video Chat Active' : 'Join Video Chat'}
    </button>
  )
}
```

### Access Streams

```tsx
const { localStream, remoteStreams } = useWebRTC()

// Local video
<video ref={ref => ref && (ref.srcObject = localStream)} />

// Remote videos
{Array.from(remoteStreams.entries()).map(([peerId, stream]) => (
  <video key={peerId} ref={ref => ref && (ref.srcObject = stream)} />
))}
```

### Control Devices

```tsx
const {
  toggleWebcam,
  toggleMicrophone,
  isWebcamActive,
  isMicrophoneMuted
} = useWebRTC()

<button onClick={toggleWebcam}>
  {isWebcamActive ? 'Turn Off Camera' : 'Turn On Camera'}
</button>

<button onClick={toggleMicrophone}>
  {isMicrophoneMuted ? 'Unmute' : 'Mute'}
</button>
```

### Enable AI Features

```tsx
const {
  enableVirtualBackground,
  enableAudioProcessor,
  enableFaceAvatar,
  virtualBackground,
  audioProcessor,
  faceAvatar
} = useWebRTC()

// Virtual background
<button onClick={enableVirtualBackground}>
  Enable Virtual Background
</button>

// Audio enhancement
<button onClick={enableAudioProcessor}>
  Enable Noise Suppression
</button>

// Face avatar (hidden by default - type "face" in settings)
<button onClick={enableFaceAvatar}>
  Enable 3D Avatar
</button>
```

---

## 🌐 Browser Support

| Feature | Chrome/Edge | Firefox | Safari |
|---------|-------------|---------|--------|
| Video/Audio | ✅ 94+ | ✅ 90+ | ✅ 15.4+ |
| Virtual Backgrounds | ✅ 94+ | ❌ | ❌ |
| Audio Processing | ✅ | ✅ | ✅ |
| Face Avatars | ✅ 94+ | ❌ | ❌ |

**Note**: Virtual backgrounds and avatars require `MediaStreamTrackProcessor` API (Chrome/Edge only)

---

## 🐛 Common Issues

### Camera/Mic Not Working

1. Check browser permissions
2. Use HTTPS (required for getUserMedia)
3. Test with simple getUserMedia call

### Peer Connection Fails

1. Check socket.io connection
2. Verify signaling events
3. Use TURN server for production

### Virtual Background Not Working

1. Verify WASM files are accessible
2. Check browser compatibility (Chrome/Edge only)
3. Ensure models are downloaded

### High CPU Usage

1. Lower video resolution
2. Disable AI features on low-end devices
3. Use blur instead of image backgrounds

---

## 📚 Documentation

For detailed documentation, see:
- [WebcamIntegrationGuide.md](../client/docs/WebcamIntegrationGuide.md) - Comprehensive guide
- [WebRTCContext.tsx](src/contexts/WebRTCContext.tsx) - Inline documentation
- [WebcamDisplay.tsx](src/components/WebcamDisplay.tsx) - Component documentation

---

## 🔒 Security Notes

- Never expose TURN credentials in client code
- Validate peer IDs on server
- Rate limit signaling events
- Use HTTPS in production
- Sanitize user inputs

---

## 🎯 Features Roadmap

Current features (✅):
- [x] WebRTC video/audio
- [x] Virtual backgrounds
- [x] Noise suppression
- [x] 3D face avatars
- [x] Device management
- [x] Mobile support

Potential additions (from DDF):
- [ ] Screen sharing
- [ ] Recording
- [ ] Custom overlays
- [ ] Reactions/emojis
- [ ] Voice activity detection

---

## 📄 License

MIT License - Feel free to use in your projects

---

## 💬 Support

For questions or issues:
1. Check the comprehensive guide in `docs/WebcamIntegrationGuide.md`
2. Review source code comments
3. Test in Chrome DevTools console
4. Check `chrome://webrtc-internals` for WebRTC debugging

---

## 🙏 Credits

Built for **DDF Quiz Game** using:
- WebRTC for P2P communication
- MediaPipe for AI features
- Three.js for 3D rendering
- Socket.io for signaling

---

**Ready to add video chat to your game? Copy, paste, and play! 🚀**

*Last updated: 2025*
