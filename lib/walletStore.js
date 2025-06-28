import create from 'zustand'
import { nanoid } from 'nanoid'

export const useWalletStore = create((set) => ({
  assets: [],

  addAsset: (asset) =>
    set((state) => ({
      assets: [...state.assets, { id: nanoid(), ...asset }],
    })),

  removeAsset: (id) =>
    set((state) => ({
      assets: state.assets.filter((asset) => asset.id !== id),
    })),
}))
