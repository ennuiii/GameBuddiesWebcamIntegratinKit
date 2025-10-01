# Installation Checklist

Use this checklist to ensure proper installation of the webcam integration kit.

## Prerequisites

- [ ] Node.js 18+ installed
- [ ] React 18+ project set up
- [ ] Tailwind CSS configured (or equivalent CSS)
- [ ] Socket.io server running

## File Copy

- [ ] Copied `src/contexts/WebRTCContext.tsx` to your project
- [ ] Copied `src/components/WebcamDisplay.tsx` to your project
- [ ] Copied `src/components/MediaControls.tsx` to your project
- [ ] Copied `src/services/*.ts` files to your project (if using AI features)
- [ ] Copied `src/utils/translations.ts` to your project
- [ ] Copied `src/locales/*.ts` files to your project
- [ ] Copied `public/wasm/*` files to your public folder (if using AI features)
- [ ] Copied `public/models/*` files to your public folder (if using AI features)

## Dependencies

- [ ] Installed `socket.io-client`
- [ ] Installed `lucide-react`
- [ ] Installed `zustand` (or have alternative state management)
- [ ] Installed `@mediapipe/tasks-vision` (if using AI features)
- [ ] Installed `three` (if using face avatars)
- [ ] Installed `@types/three` (if using TypeScript with avatars)

## State Management Setup

- [ ] Created/updated Zustand store with required fields:
  - [ ] `socket` - Socket.io connection
  - [ ] `userId` - Current user ID
  - [ ] `roomCode` - Current room code
  - [ ] `userRole` - 'player' or 'gamemaster'
  - [ ] `room` - Room state object
  - [ ] `language` - Current language ('en', 'de', etc.)
  - [ ] `hasVoted` - Voting state
  - [ ] `submitVote()` - Vote submission function
  - [ ] `updateMediaState()` - Media state update function

## App Integration

- [ ] Wrapped app with `<WebRTCProvider>`
- [ ] Added `<WebcamDisplay />` component to your UI
- [ ] Tested basic rendering (no errors)

## Server-Side Setup

- [ ] Added WebRTC socket event handlers:
  - [ ] `webrtc:enable-video`
  - [ ] `webrtc:disable-video`
  - [ ] `webrtc:offer`
  - [ ] `webrtc:answer`
  - [ ] `webrtc:ice-candidate`
  - [ ] Cleanup on `disconnect`

## Testing

- [ ] Can click "Join Video Chat" button
- [ ] Camera permission prompt appears
- [ ] Local video feed shows
- [ ] Can toggle camera on/off
- [ ] Can toggle microphone on/off
- [ ] Can open settings modal
- [ ] Can select different camera/microphone

## Multi-User Testing

- [ ] Open 2 browser windows/tabs
- [ ] Both join same room
- [ ] Both enable video chat
- [ ] Can see each other's video
- [ ] Audio works (use headphones to avoid echo)
- [ ] Can toggle camera/mic independently

## AI Features Testing (Optional)

### Virtual Backgrounds
- [ ] WASM files accessible at `/wasm/vision_wasm_internal.wasm`
- [ ] Model file accessible at `/models/selfie_segmenter.tflite`
- [ ] Can enable virtual background in settings
- [ ] Background replacement/blur works
- [ ] Can switch between blur and images
- [ ] Performance is acceptable (check CPU usage)

### Audio Processing
- [ ] Can enable AI noise suppression
- [ ] Can adjust noise threshold slider
- [ ] Audio quality improves with feature enabled

### Face Avatars
- [ ] WASM files accessible (same as virtual backgrounds)
- [ ] Model file accessible at `/models/face_landmarker.task`
- [ ] Avatar GLB file accessible at `/models/raccoon_head.glb`
- [ ] Type "face" in settings modal to unlock feature
- [ ] Avatar tab appears
- [ ] Can enable 3D avatar
- [ ] Avatar tracks face movements
- [ ] Can select different avatar types

## Browser Testing

- [ ] Tested on Chrome/Edge (full features)
- [ ] Tested on Firefox (basic features only)
- [ ] Tested on Safari (basic features only)
- [ ] Tested on mobile Chrome (Android)
- [ ] Tested on mobile Safari (iOS)

## Performance Testing

- [ ] CPU usage acceptable during video chat
- [ ] Memory usage doesn't increase over time
- [ ] No video/audio lag
- [ ] Works with 5+ participants

## Troubleshooting

If something doesn't work:

1. **Check Browser Console** - Look for errors
2. **Check Network Tab** - Verify WASM/model files load
3. **Check Socket Connection** - Verify socket.io connected
4. **Check Permissions** - Allow camera/microphone
5. **Check HTTPS** - Use HTTPS in production (required for getUserMedia)
6. **Check chrome://webrtc-internals** - Debug WebRTC connections

## Production Checklist

- [ ] Using HTTPS
- [ ] Using proper TURN server (not just STUN)
- [ ] Rate limiting on signaling events
- [ ] Error handling in place
- [ ] Fallbacks for unsupported browsers
- [ ] Mobile optimizations enabled
- [ ] Asset files properly served (CORS configured)
- [ ] WASM files have correct MIME type
- [ ] Monitoring/logging in place

## Done! 🎉

Once all items are checked, your webcam integration is complete!

---

**Need help?** Check:
- `README.md` for installation guide
- `../client/docs/WebcamIntegrationGuide.md` for detailed documentation
- Source code comments for inline documentation
