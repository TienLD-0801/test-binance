import { Store } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'

const usePersistor = (store: Store) => {
  const persistor = persistStore(store)
  return persistor
}

export default usePersistor
