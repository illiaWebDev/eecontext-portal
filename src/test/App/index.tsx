import React from 'react';
import {
  WithCtx,
  useSelector,
  useDispatch,
  useCtx,
} from './EECtxSetup';
import { EEContextPortalRoot, EEContextPortalRootProps } from '../../Root';
import { aCreators } from '../../EECtx';


// ===================================================================================

const Modal = React.memo( () => {
  const dispatch = useDispatch();
  const close = React.useCallback( () => (
    dispatch( aCreators.popPortal() )
  ), [ dispatch ] );

  return (
    <div
      style={ {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      } }
    >
      <div
        style={ {
          padding: '1rem',
          backgroundColor: '#fff',
        } }
      >
        Modal contents
        <br />

        <button type='button' onClick={ close }>
          Close
        </button>
      </div>
    </div>
  );
} );
Modal.displayName = 'test/App/Modal';

// ===================================================================================


const Core = React.memo( () => {
  const dispatch = useDispatch();
  const onClick = React.useCallback(
    () => dispatch( aCreators.pushPortal( {
      Comp: Modal,
    } ) ),
    [ dispatch ],
  );

  return (
    <button type='button' onClick={ onClick }>Click me</button>
  );
} );
Core.displayName = 'test/App/Core';


const useEEContextPortalState: EEContextPortalRootProps[ 'useEEContextPortalState' ] = () => (
  useSelector( s => s.eecontextPortals )
);
const useEECtxStore: EEContextPortalRootProps[ 'useEECtxStore' ] = useCtx;
const encloseEECtxStore: EEContextPortalRootProps[ 'encloseEECtxStore' ] = s => (
  console.info( 55555, s )
);

export const App = React.memo( () => (
  <WithCtx>
    <Core />

    <EEContextPortalRoot
      { ...{
        useEEContextPortalState,
        encloseEECtxStore,
        useEECtxStore,
      } }
    />
  </WithCtx>
) );
App.displayName = 'test/App';
