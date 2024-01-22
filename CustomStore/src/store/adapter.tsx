import { FC, createContext, useContext } from 'react'
import { Dispatch, State, Store } from '.'
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector'

type StoreProviderProps = {
  store: Store
  children: React.ReactNode
}

const StoreContext = createContext<Store | null>(null)

// Wrapper component - so that everything in the app can access my store
export const StoreProvider: FC<StoreProviderProps> = ({ store, children }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

const useStore = (): Store => {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error("StoreProvider isn't in React Tree")
  }

  return store
}

export const useDispatch = (): Dispatch => {
  return useStore().dispatch
}

type EqualityFn<T> = (a: T, b: T) => boolean

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const refEquality: EqualityFn<any> = (a, b) => a === b

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useSelector = <Selector extends (state: State) => any>(
  selector: Selector,
  equalityFn: EqualityFn<ReturnType<Selector>> = refEquality
): ReturnType<Selector> => {
  const store = useStore()

  const selectedState = useSyncExternalStoreWithSelector(
    store.subscribe,
    store.getState,
    undefined,
    selector,
    equalityFn
  )

  return selectedState
}
