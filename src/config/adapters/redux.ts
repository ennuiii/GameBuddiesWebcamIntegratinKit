/**
 * Redux Adapter for Webcam Integration
 *
 * This adapter works with Redux stores.
 * Customize the selectors for your specific Redux state structure.
 */

import { Store } from 'redux';
import { WebcamConfig, createWebcamConfig } from '../WebcamConfig';

/**
 * Create a Redux adapter for webcam config
 *
 * @param store - Your Redux store instance
 * @param selectors - Selectors to extract data from your state
 * @returns WebcamConfig compatible with your Redux store
 *
 * @example
 * ```typescript
 * import { store } from './store';
 * import { createReduxAdapter } from 'webcam-integration-kit/config/adapters/redux';
 *
 * export const webcamConfig = createReduxAdapter(store, {
 *   getSocket: (state) => state.socket.connection,
 *   getUserId: (state) => state.auth.userId,
 *   getRoomCode: (state) => state.game.roomCode,
 *   getPlayers: (state) => state.game.players,
 *   getLanguage: (state) => state.settings.language,
 * });
 * ```
 */
export function createReduxAdapter(
  store: Store,
  selectors: {
    getSocket: (state: any) => any;
    getUserId: (state: any) => string | null;
    getRoomCode: (state: any) => string | null;
    getUserRole?: (state: any) => string;
    getPlayers?: (state: any) => any[];
    getGamemaster?: (state: any) => { id: string; name: string } | null;
    getLanguage?: (state: any) => string;
    getHasVoted?: (state: any) => boolean;
    getGameState?: (state: any) => string;
    // Add more selectors as needed
  },
  actions?: {
    onMediaStateChange?: (isMicOn: boolean) => any;
    onVote?: (playerId: string) => any;
  }
): WebcamConfig {
  return createWebcamConfig({
    // Required
    getSocket: () => selectors.getSocket(store.getState()),
    getUserId: () => selectors.getUserId(store.getState()),
    getRoomCode: () => selectors.getRoomCode(store.getState()),

    // Optional
    getUserRole: selectors.getUserRole
      ? () => selectors.getUserRole!(store.getState())
      : undefined,

    getPlayers: selectors.getPlayers
      ? () => selectors.getPlayers!(store.getState())
      : undefined,

    getGamemaster: selectors.getGamemaster
      ? () => selectors.getGamemaster!(store.getState())
      : undefined,

    getLanguage: selectors.getLanguage
      ? () => selectors.getLanguage!(store.getState())
      : undefined,

    getHasVoted: selectors.getHasVoted
      ? () => selectors.getHasVoted!(store.getState())
      : undefined,

    getGameState: selectors.getGameState
      ? () => selectors.getGameState!(store.getState())
      : undefined,

    onMediaStateChange: actions?.onMediaStateChange
      ? (isMicOn) => store.dispatch(actions.onMediaStateChange!(isMicOn))
      : undefined,

    onVote: actions?.onVote
      ? (playerId) => store.dispatch(actions.onVote!(playerId))
      : undefined,

    // Game-specific features (disable by default, let user enable)
    showLives: false,
    showVoting: false,
    showTurnIndicators: false,
  });
}

/**
 * Example: Simple card game with Redux
 */
export function createCardGameReduxAdapter(store: Store): WebcamConfig {
  return createReduxAdapter(
    store,
    {
      getSocket: (state) => state.socket.connection,
      getUserId: (state) => state.user.id,
      getRoomCode: (state) => state.game.roomId,
      getPlayers: (state) => state.game.players,
      getLanguage: (state) => state.settings.language || 'en',
    },
    {
      onMediaStateChange: (isMicOn) => ({
        type: 'MEDIA_STATE_CHANGED',
        payload: { isMicOn },
      }),
    }
  );
}
