import React from 'react';
import type { Rtrn } from '@illia-web-dev/react-utils/dist/EECtx';
import type { State } from './EECtx';


/* eslint-disable @typescript-eslint/no-explicit-any */
type EncloseStoreCompProps = {
  /**
   * we sometimes want more control over portals in EECtx,\
   * for example in redux sagas. In order to achieve that,\
   * this function should be used to retrieve 'store' from\
   * context and then passed to encloseEECtxStore that will enclose \
   * that and use whenever specific redux action gets dispatched.
   */
  useEECtxStore: () => Rtrn< any >[ 'store' ];
  encloseEECtxStore: ( s: Rtrn< any >[ 'store' ] ) => unknown;
};
/* eslint-enable @typescript-eslint/no-explicit-any */


const EncloseStoreComp = React.memo< EncloseStoreCompProps >( ( { encloseEECtxStore, useEECtxStore } ) => {
  const store = useEECtxStore();

  React.useEffect( () => {
    encloseEECtxStore( store );
  }, [ store, encloseEECtxStore ] );

  return null;
} );
EncloseStoreComp.displayName = '_illia_web_dev_/eecontext_portal/Root/EncloseStoreComp';


export type EEContextPortalRootProps = Partial< EncloseStoreCompProps > & {
  useEEContextPortalState: () => State;
};
export const EEContextPortalRoot: React.FC< EEContextPortalRootProps > = React.memo( p => {
  const { useEEContextPortalState, useEECtxStore, encloseEECtxStore } = p;

  const { portals } = useEEContextPortalState();

  return (
    <>
      {
        useEECtxStore && encloseEECtxStore
          ? <EncloseStoreComp { ...{ useEECtxStore, encloseEECtxStore } } />
          : null
      }
      {
        // eslint-disable-next-line react/jsx-props-no-spreading
        portals.map( ( { Comp, id, props } ) => ( <Comp key={ id } props={ props } /> ) )
      }
    </>
  );
} );
EEContextPortalRoot.displayName = '_illia_web_dev/eecontext_portal/Root';
