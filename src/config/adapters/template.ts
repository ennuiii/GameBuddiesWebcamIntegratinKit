/**
 * TEMPLATE: Custom Adapter for Webcam Integration
 *
 * Copy this file and customize it for your specific game!
 * Claude AI can auto-generate this based on your project structure.
 *
 * Instructions:
 * 1. Replace all [PLACEHOLDER] comments with your actual code
 * 2. Remove features you don't need (showLives, showVoting, etc.)
 * 3. Export your config and use it in WebRTCProvider
 */

import { WebcamConfig, createWebcamConfig } from '../WebcamConfig';

// =====================================================
// STEP 1: Import your state management / data sources
// =====================================================

// [PLACEHOLDER] Import your socket connection
// Example: import { socket } from '../services/socket';

// [PLACEHOLDER] Import your state management
// Example: import { useGameStore } from '../stores/gameStore';
// Example: import { store } from '../redux/store';
// Example: import { useGameContext } from '../contexts/GameContext';

// =====================================================
// STEP 2: Create your adapter function
// =====================================================

/**
 * Create webcam config for [YOUR GAME NAME]
 *
 * @returns WebcamConfig compatible with your game
 */
export function createMyGameAdapter(): WebcamConfig {
  return createWebcamConfig({
    // =====================================================
    // REQUIRED: Core Video Chat Functionality
    // =====================================================

    /**
     * Get your Socket.io connection
     */
    getSocket: () => {
      // [PLACEHOLDER] Return your socket instance
      // Example (global): return socket;
      // Example (Zustand): return useGameStore.getState().socket;
      // Example (Redux): return store.getState().socket.connection;
      throw new Error('getSocket not implemented - replace this with your socket instance');
    },

    /**
     * Get the current user's ID
     */
    getUserId: () => {
      // [PLACEHOLDER] Return current user ID
      // Example (Zustand): return useGameStore.getState().userId;
      // Example (Redux): return store.getState().auth.currentUser?.id || null;
      // Example (Context): const { user } = useGameContext(); return user?.id || null;
      throw new Error('getUserId not implemented - replace this with your user ID');
    },

    /**
     * Get the current room/game code
     */
    getRoomCode: () => {
      // [PLACEHOLDER] Return current room code
      // Example (Zustand): return useGameStore.getState().roomCode;
      // Example (Redux): return store.getState().game.currentRoom?.code || null;
      // Example (Context): const { game } = useGameContext(); return game?.roomCode || null;
      throw new Error('getRoomCode not implemented - replace this with your room code');
    },

    // =====================================================
    // OPTIONAL: Enhanced Functionality
    // =====================================================

    /**
     * Get user role (if your game has roles)
     */
    getUserRole: () => {
      // [PLACEHOLDER] Return user role or remove this if not needed
      // Example: return useGameStore.getState().userRole || 'player';
      return 'player'; // Default
    },

    /**
     * Get list of players (if your game has multiplayer)
     */
    getPlayers: () => {
      // [PLACEHOLDER] Return array of players or remove if not needed
      // Example: return useGameStore.getState().players || [];
      // Format: [{ id: string, name: string, ...otherFields }]
      return []; // Default: no players
    },

    /**
     * Get gamemaster/host (if your game has a host)
     */
    getGamemaster: () => {
      // [PLACEHOLDER] Return host/gamemaster or remove if not needed
      // Example: return useGameStore.getState().host;
      return null; // Default: no gamemaster
    },

    /**
     * Get current language (for i18n)
     */
    getLanguage: () => {
      // [PLACEHOLDER] Return language code or remove if not needed
      // Example: return useGameStore.getState().language || 'en';
      return 'en'; // Default: English
    },

    /**
     * Callback when mic state changes
     */
    onMediaStateChange: (isMicOn: boolean) => {
      // [PLACEHOLDER] Handle media state change in your game
      // Example: useGameStore.getState().setMicState(isMicOn);
      // Example: store.dispatch({ type: 'SET_MIC_STATE', payload: isMicOn });
      console.log('Mic state changed:', isMicOn);
    },

    // =====================================================
    // OPTIONAL: Game-Specific UI Features
    // =====================================================

    /**
     * Whether to show lives/hearts (for games with health)
     */
    showLives: false, // [PLACEHOLDER] Change to true if your game has lives

    /**
     * Get lives for a player (if showLives is true)
     */
    getLivesForPlayer: (playerId: string) => {
      // [PLACEHOLDER] Return player's lives or remove if not needed
      // Example:
      // const players = useGameStore.getState().players;
      // const player = players.find(p => p.id === playerId);
      // return player?.health || 0;
      return 3; // Default: 3 lives
    },

    /**
     * Whether to show voting buttons (for voting games)
     */
    showVoting: false, // [PLACEHOLDER] Change to true if your game has voting

    /**
     * Whether user has already voted
     */
    getHasVoted: () => {
      // [PLACEHOLDER] Return voting state or remove if not needed
      // Example: return useGameStore.getState().hasVoted;
      return false; // Default: not voted
    },

    /**
     * Handle vote action
     */
    onVote: (playerId: string) => {
      // [PLACEHOLDER] Handle voting or remove if not needed
      // Example: useGameStore.getState().submitVote(playerId);
      // Example: store.dispatch(voteForPlayer(playerId));
      console.log('Voted for player:', playerId);
    },

    /**
     * Check if in voting phase
     */
    isVotingPhase: () => {
      // [PLACEHOLDER] Return voting phase state or remove if not needed
      // Example: return useGameStore.getState().gamePhase === 'voting';
      return false; // Default: not voting
    },

    /**
     * Whether to show turn indicators (for turn-based games)
     */
    showTurnIndicators: false, // [PLACEHOLDER] Change to true if turn-based

    /**
     * Get current turn player
     */
    getCurrentTurnPlayer: () => {
      // [PLACEHOLDER] Return current turn player ID or remove if not needed
      // Example: return useGameStore.getState().currentTurnPlayerId;
      return null; // Default: no turn system
    },

    /**
     * Get next turn player
     */
    getNextTurnPlayer: () => {
      // [PLACEHOLDER] Return next turn player ID or remove if not needed
      // Example: return useGameStore.getState().nextTurnPlayerId;
      return null; // Default: no turn system
    },

    /**
     * Get current game state
     */
    getGameState: () => {
      // [PLACEHOLDER] Return game state or remove if not needed
      // Example: return useGameStore.getState().gameState;
      return 'playing'; // Default: playing
    },

    // =====================================================
    // OPTIONAL: UI Customization
    // =====================================================

    containerClassName: '', // [PLACEHOLDER] Add custom CSS class if needed
    compactMode: false, // [PLACEHOLDER] Set to true for smaller UI
    maxVideoFeeds: Infinity, // [PLACEHOLDER] Limit number of video feeds if needed

    /**
     * Custom player name formatter
     */
    formatPlayerName: (player) => {
      // [PLACEHOLDER] Customize player name display
      // Example: return `${player.name} (Lv.${player.level})`;
      return player.name; // Default: just the name
    },
  });
}

// =====================================================
// STEP 3: Export your config
// =====================================================

/**
 * Your game's webcam configuration
 * Use this in WebRTCProvider
 */
export const myGameWebcamConfig = createMyGameAdapter();

// =====================================================
// STEP 4: Usage in your app
// =====================================================

/*
// In your App.tsx or main component:

import { WebRTCProvider } from 'webcam-integration-kit/contexts/WebRTCContext';
import { WebcamConfigProvider } from 'webcam-integration-kit/config/WebcamConfig';
import { myGameWebcamConfig } from './config/myGameAdapter';

function App() {
  return (
    <WebcamConfigProvider config={myGameWebcamConfig}>
      <WebRTCProvider>
        <YourGameComponent />
      </WebRTCProvider>
    </WebcamConfigProvider>
  );
}
*/
