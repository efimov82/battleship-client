import {
  DependencyInjector,
  HookTuple,
  makeInjector,
  useInjectorHook,
} from "@mindspace-io/utils";
import { GameService, WS_GAME_HOST } from "../services/game.service";

const host = process.env.NEXT_PUBLIC_WS_GAME_HOST;

export const injector: DependencyInjector = makeInjector([
  //"wss://game-miner-core.herokuapp.com"
  { provide: WS_GAME_HOST, useValue: host },
  { provide: GameService, useClass: GameService, deps: [WS_GAME_HOST] },
]);

export function useService<T>(token: any): HookTuple<T, DependencyInjector> {
  return useInjectorHook(token, injector);
}
