import create from 'zustand'

import createGlobalSlice, { IGlobalStore } from '@/stores/modules/global'

export type IStore = IGlobalStore

const useStore = create<IStore>()((...args) => ({
  ...createGlobalSlice(args),
}))

export default useStore
