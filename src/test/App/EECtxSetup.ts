import { init as EECtxInit, StoreNS } from '@illia-web-dev/react-utils/dist/EECtx';
import * as portalsEECtx from '../../EECtx';


export type State = {
  eecontextPortals: portalsEECtx.State;
};
const rootReducer: StoreNS.Reducer< State > = StoreNS.combineReducers( {
  eecontextPortals: portalsEECtx.reducer,
} );


export const {
  WithCtx,
  ctx,
  store,
  useCtx,
  useDispatch,
  useGetState,
  useSelector,
  useSubscribe,
} = EECtxInit( { rootReducer, displayNamePrefix: 'eecontext-portal' } );
