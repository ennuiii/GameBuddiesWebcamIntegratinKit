/**
 * Zustand Adapter for Webcam Integration
 *
 * This adapter works with DDF's Zustand store structure.
 * Use this as a template for your own Zustand-based games.
 */

import { WebcamConfig, createWebcamConfig } from '../WebcamConfig';

/**
 * Create a Zustand adapter for webcam config
 *
 * @param useStore - Your Zustand store hook (e.g., useUnifiedStore)
 * @returns WebcamConfig compatible with your Zustand store
 *
 * @example
 * ```typescript
 * import useUnifiedStore from './stores/unifiedStore';
 * import { createZustandAdapter } from 'webcam-integration-kit/config/adapters/zustand';
 *
 * export const webcamConfig = createZustandAdapter(useUnifiedStore);
 * ```
 */
export function createZustandAdapter(useStore: any): WebcamConfig {
  return createWebcamConfig({
    // Required: Core functionality
    getSocket: () => useStore.getState().socket,
    getUserId: () => useStore.getState().userId,
    getRoomCode: () => useStore.getState().roomCode,

    // Optional: Enhanced functionality
    getUserRole: () => useStore.getState().userRole || 'player',
    getLanguage: () => useStore.getState().language || 'en',

    getPlayers: () => {
      const room = useStore.getState().room;
      return room?.players || [];
    },

    getGamemaster: () => {
      const room = useStore.getState().room;
      return room?.gamemaster || null;
    },

    onMediaStateChange: (isMicOn: boolean) => {
      const updateMediaState = useStore.getState().updateMediaState;
      if (updateMediaState) {
        updateMediaState(isMicOn);
      }
    },

    // Game-specific features (customize these for your game)
    showLives: true,
    getLivesForPlayer: (playerId: string) => {
      const room = useStore.getState().room;
      const player = room?.players?.find((p: any) => p.id === playerId);
      return player?.lives ?? 3;
    },

    showVoting: true,
    getHasVoted: () => useStore.getState().hasVoted || false,
    onVote: (playerId: string) => {
      const submitVote = useStore.getState().submitVote;
      if (submitVote) {
        submitVote(playerId);
      }
    },
    isVotingPhase: () => {
      const room = useStore.getState().room;
      return room?.gameState === 'voting';
    },

    showTurnIndicators: true,
    getCurrentTurnPlayer: () => {
      const room = useStore.getState().room;
      return room?.targetPlayerId || null;
    },
    getNextTurnPlayer: () => {
      const room = useStore.getState().room;
      if (room?.gameState === 'playing' && room?.players?.length > 0) {
        const activePlayers = room.players.filter((p: any) => !p.isEliminated);
        const currentIndex = room.currentPlayerIndex || 0;
        return activePlayers[currentIndex]?.id || null;
      }
      return null;
    },
    getGameState: () => {
      const room = useStore.getState().room;
      return room?.gameState || 'playing';
    },
  });
}

/**
 * Example: DDF-specific adapter (exact match for DDF's structure)
 */
export function createDDFAdapter(useUnifiedStore: any): WebcamConfig {
  return createZustandAdapter(useUnifiedStore);
}
