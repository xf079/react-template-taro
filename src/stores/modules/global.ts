import { StateCreator } from 'zustand'

export interface IGlobalStoreState {
  version: string
}

export interface IGlobalStoreEvents {
  updateVersion: (version: string) => void
}

export type IGlobalStore = IGlobalStoreState & IGlobalStoreEvents

const createGlobalSlice: StateCreator<
  IGlobalStore,
  [],
  [],
  IGlobalStore
> = (set) => ({
  version: '0.0.1',
  updateVersion: (version) => {
    set({ version })
  },
})

export default createGlobalSlice
