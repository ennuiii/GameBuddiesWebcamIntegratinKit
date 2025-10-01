# Quick Reference Card

> **Copy-paste snippets for rapid integration**

---

## 🚀 5-Minute Setup

### 1. Install Dependencies (30 seconds)

```bash
npm install socket.io-client lucide-react zustand @mediapipe/tasks-vision three
```

### 2. Copy Files (30 seconds)

```bash
cp -r webcam-integration-kit/src/* your-game/client/src/
cp -r webcam-integration-kit/public/* your-game/client/public/
```

### 3. Set Up Store (1 minute)

```typescript
// stores/unifiedStore.ts
import { create } from 'zustand'
import io from 'socket.io-client'

const socket = io('http://localhost:3001')

export default create((set) => ({
  socket,
  userId: null,
  roomCode: null,
  userRole: 'player',
  room: null,
  language: 'en',
  hasVoted: false,
  submitVote: (id) => socket.emit('vote', { id }),
  updateMediaState: (isMicOn) => socket.emit('media', { isMicOn })
}))
```

### 4. Wrap App (30 seconds)

```tsx
// App.tsx
import { WebRTCProvider } from './contexts/WebRTCContext'

export default function App() {
  return (
    <WebRTCProvider>
      <YourGame />
    </WebRTCProvider>
  )
}
```

### 5. Add Component (30 seconds)

```tsx
// YourGame.tsx
import WebcamDisplay from './components/WebcamDisplay'

export default function YourGame() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1 }}>
        {/* Your game UI */}
      </div>
      <div style={{ width: 350, padding: 16, background: '#1a1a2e' }}>
        <WebcamDisplay />
      </div>
    </div>
  )
}
```

### 6. Server Events (2 minutes)

```typescript
// server/index.ts
io.on('connection', (socket) => {
  const peers = new Map()

  socket.on('webrtc:enable-video', ({ roomCode, peerId, connectionType }) => {
    if (!peers.has(roomCode)) peers.set(roomCode, new Set())
    peers.get(roomCode).add(peerId)

    io.to(roomCode).emit('webrtc:video-enabled-peers', {
      peers: Array.from(peers.get(roomCode)),
      peerConnectionTypes: { [peerId]: connectionType }
    })
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
})
```

**Done!** 🎉 Open 2 browsers, join same room, enable video.

---

## 📦 Hook API

```typescript
import { useWebRTC } from './contexts/WebRTCContext'

const {
  // Streams
  localStream,              // Your video/audio
  remoteStreams,            // Map<peerId, MediaStream>

  // State
  isVideoEnabled,           // Video chat active?
  isWebcamActive,           // Camera on?
  isMicrophoneMuted,        // Mic muted?

  // Actions
  enableVideoChat,          // Start video chat
  toggleWebcam,             // Toggle camera
  toggleMicrophone,         // Toggle microphone

  // AI Features
  enableVirtualBackground,  // Enable background blur/replace
  enableAudioProcessor,     // Enable noise suppression
  enableFaceAvatar          // Enable 3D avatar
} = useWebRTC()
```

---

## 🎮 Common Patterns

### Display Local Video

```tsx
<video
  ref={ref => ref && (ref.srcObject = localStream)}
  autoPlay
  muted
  playsInline
  style={{ width: 200, borderRadius: 8 }}
/>
```

### Display Remote Videos

```tsx
{Array.from(remoteStreams.entries()).map(([peerId, stream]) => (
  <video
    key={peerId}
    ref={ref => ref && (ref.srcObject = stream)}
    autoPlay
    playsInline
    style={{ width: 200, borderRadius: 8 }}
  />
))}
```

### Join Button

```tsx
<button onClick={enableVideoChat}>
  {isVideoEnabled ? '📹 Video Chat Active' : '🎥 Join Video Chat'}
</button>
```

### Camera/Mic Controls

```tsx
<button onClick={toggleWebcam}>
  {isWebcamActive ? '📷 Camera On' : '📷 Camera Off'}
</button>

<button onClick={toggleMicrophone}>
  {isMicrophoneMuted ? '🔇 Muted' : '🎤 Unmuted'}
</button>
```

### Virtual Background

```tsx
<button onClick={enableVirtualBackground}>
  🌄 Enable Background Blur
</button>
```

### Noise Suppression

```tsx
<button onClick={enableAudioProcessor}>
  🎤 Enable Noise Suppression
</button>
```

---

## 🎨 Quick Styling

```css
/* Tailwind (built-in) */
.webcam-display { /* Already styled */ }

/* Or custom CSS */
.video-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.video-feed {
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
```

---

## 🐛 Debug Snippets

### Check Connection Status

```tsx
useEffect(() => {
  console.log('Local stream:', localStream?.id)
  console.log('Remote streams:', remoteStreams.size)
  console.log('Video enabled:', isVideoEnabled)
}, [localStream, remoteStreams, isVideoEnabled])
```

### Monitor ICE Connection

Open Chrome DevTools → `chrome://webrtc-internals`

### Test Camera Access

```typescript
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => console.log('✅ Camera works:', stream))
  .catch(err => console.log('❌ Camera error:', err))
```

### Check Assets

```bash
# Should return 200 OK
curl http://localhost:3000/wasm/vision_wasm_internal.wasm -I
curl http://localhost:3000/models/selfie_segmenter.tflite -I
```

---

## 📱 Mobile Optimization

```typescript
// Detect mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

// Lower quality on mobile
const constraints = {
  video: {
    width: { ideal: isMobile ? 480 : 640 },
    height: { ideal: isMobile ? 360 : 480 },
    frameRate: { ideal: isMobile ? 15 : 24 }
  }
}
```

---

## 🔧 Configuration Examples

### Minimal (Video Only)

```typescript
// Don't install MediaPipe
// Don't copy WASM/models
// Remove AI service imports from WebRTCContext.tsx
```

### Full Featured (Everything)

```typescript
// Install all dependencies
// Copy all files
// Keep all code as-is
```

### Custom Game Integration

```typescript
// Card game with circular video feeds
const PlayerCircle = ({ player, stream }) => (
  <div style={{
    width: 120,
    height: 120,
    borderRadius: '50%',
    overflow: 'hidden',
    border: '3px solid #4f46e5'
  }}>
    <video
      ref={ref => ref && (ref.srcObject = stream)}
      autoPlay
      playsInline
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  </div>
)
```

---

## 🚨 Quick Fixes

### Camera not showing
```typescript
// Check permissions
navigator.permissions.query({ name: 'camera' })
  .then(p => console.log(p.state))
```

### Remote video not connecting
```typescript
// Check socket connection
socket.connected // Should be true
```

### Virtual background not working
```typescript
// Check browser
if (!('MediaStreamTrackProcessor' in window)) {
  console.log('Use Chrome/Edge for AI features')
}
```

### Audio echo
```tsx
// Always mute self video
<video muted={isSelf} />
```

---

## 📊 Performance Tips

```typescript
// Lower resolution
width: { ideal: 480, max: 640 }

// Lower framerate
frameRate: { ideal: 15, max: 24 }

// Use blur instead of images
config.useBlur = true

// Disable AI on low-end devices
if (isMobile || isLowEnd) {
  // Don't enable virtualBackground/faceAvatar
}
```

---

## 🔗 Useful Links

- Chrome WebRTC Internals: `chrome://webrtc-internals`
- Test your webcam: https://webcamtests.com
- MediaPipe docs: https://developers.google.com/mediapipe
- WebRTC docs: https://webrtc.org

---

## 💡 Pro Tips

1. **Always use HTTPS** in production (required for getUserMedia)
2. **Use TURN server** for production (NAT traversal)
3. **Test with headphones** (avoid audio echo)
4. **Start with 2 users** before testing with more
5. **Check CPU usage** when enabling AI features
6. **Lower quality on mobile** to save bandwidth
7. **Monitor memory** for leaks during long calls

---

**Need more details?** Check `README.md` and `INSTALL.md`

**Having issues?** See `FILE_STRUCTURE.txt` for file descriptions

**Want comprehensive docs?** See `../client/docs/WebcamIntegrationGuide.md`

---

*Last updated: 2025*
