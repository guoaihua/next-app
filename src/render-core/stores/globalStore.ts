/** 顶层自定义数据 */

import { create } from 'zustand'

type state = {
    [props: string]: Record<string, any>
}

type action = {
    setGlobalData: (newState: state) => void
}


export const useGlobalStore = create<state & action>((set, get) => ({
    state: {
        user: {
            name: 'ziming',
            age: 18
        }
    },
    setGlobalData: (newState) => {
        set({ state: { ...get().state, ...newState } })
    }
}))