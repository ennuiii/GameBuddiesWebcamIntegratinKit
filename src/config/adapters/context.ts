/**
 * React Context API Adapter for Webcam Integration
 *
 * This adapter works with React Context-based state management.
 */

import { Context, useContext } from 'react';
import { WebcamConfig, createWebcamConfig } from '../WebcamConfig';

/**
 * Create a Context API adapter for webcam config
 *
 * @param contexts - Object containing your React contexts
 * @param getters - Functions to extract data from context values
 * @returns WebcamConfig compatible with your Context setup
 *
 * @example
 * ```typescript
 * import { SocketContext, GameContext, UserContext } from './contexts';
 * import { createContextAdapter } from 'webcam-integration-kit/config/adapters/context';
 *
 * export function useWebcamConfigFromContext(): WebcamConfig {
 *   return createContextAdapter({
 *     SocketContext,
 *     GameContext,
 *     UserContext,
 *   }, {
 *     getSocket: (socket) => socket.connection,
 *     getUserId: (_, __, user) => user.id,
 *     getRoomCode: (_, game) => game.roomCode,
 *     getPlayers: (_, game) => game.players,
 *   });
 * }
 * ```
 */
export function createContextAdapter<T extends Record<string, Context<any>>>(
  contexts: T,
  getters: {
    getSocket: (...contextValues: any[]) => any;
    getUserId: (...contextValues: any[]) => string | null;
    getRoomCode: (...contextValues: any[]) => string | null;
    getUserRole?: (...contextValues: any[]) => string;
    getPlayers?: (...contextValues: any[]) => any[];
    getGamemaster?: (...contextValues: any[]) => { id: string; name: string } | null;
    getLanguage?: (...contextValues: any[]) => string;
    getHasVoted?: (...contextValues: any[]) => boolean;
    getGameState?: (...contextValues: any[]) => string;
  },
  actions?: {
    onMediaStateChange?: (...contextValues: any[]) => (isMicOn: boolean) => void;
    onVote?: (...contextValues: any[]) => (playerId: string) => void;
  }
): WebcamConfig {
  // Get context values
  const contextValues = Object.values(contexts).map((ctx) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useContext(ctx);
  });

  return createWebcamConfig({
    // Required
    getSocket: () => getters.getSocket(...contextValues),
    getUserId: () => getters.getUserId(...contextValues),
    getRoomCode: () => getters.getRoomCode(...contextValues),

    // Optional
    getUserRole: getters.getUserRole
      ? () => getters.getUserRole!(...contextValues)
      : undefined,

    getPlayers: getters.getPlayers
      ? () => getters.getPlayers!(...contextValues)
      : undefined,

    getGamemaster: getters.getGamemaster
      ? () => getters.getGamemaster!(...contextValues)
      : undefined,

    getLanguage: getters.getLanguage
      ? () => getters.getLanguage!(...contextValues)
      : undefined,

    getHasVoted: getters.getHasVoted
      ? () => getters.getHasVoted!(...contextValues)
      : undefined,

    getGameState: getters.getGameState
      ? () => getters.getGameState!(...contextValues)
      : undefined,

    onMediaStateChange: actions?.onMediaStateChange
      ? (isMicOn) => actions.onMediaStateChange!(...contextValues)(isMicOn)
      : undefined,

    onVote: actions?.onVote
      ? (playerId) => actions.onVote!(...contextValues)(playerId)
      : undefined,

    // Game-specific features (disable by default)
    showLives: false,
    showVoting: false,
    showTurnIndicators: false,
  });
}

/**
 * Simple adapter for single context with all data
 *
 * @example
 * ```typescript
 * const GameContext = createContext(null);
 *
 * export function useWebcamConfig(): WebcamConfig {
 *   const game = useContext(GameContext);
 *   return createSimpleContextAdapter({
 *     getSocket: () => game.socket,
 *     getUserId: () => game.currentUser.id,
 *     getRoomCode: () => game.roomCode,
 *     getPlayers: () => game.players,
 *   });
 * }
 * ```
 */
export function createSimpleContextAdapter(config: {
  getSocket: () => any;
  getUserId: () => string | null;
  getRoomCode: () => string | null;
  getUserRole?: () => string;
  getPlayers?: () => any[];
  getGamemaster?: () => { id: string; name: string } | null;
  getLanguage?: () => string;
  onMediaStateChange?: (isMicOn: boolean) => void;
  onVote?: (playerId: string) => void;
  [key: string]: any;
}): WebcamConfig {
  return createWebcamConfig(config);
}
