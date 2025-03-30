/** 顶层自定义数据 */

import { create } from "zustand";
import { getElementById } from "@/lib/utils";
import { Component } from "@/app/lowcode-app/types/component";
type state = {
  components: Component[];
};

type action = {
  setGlobalData: (newState: Component[]) => void;
  getCurrentComponentData: (componentId: number) => Record<string, any>;
  getCurrentComponentDataByUplevel: (
    component: Component,
    upLevel?: number,
  ) => Record<string, any>;
};

export const useGlobalStore = create<state & action>((set, get) => ({
  components: [],
  setGlobalData: (components) => {
    set({ components: [...components] });
  },
  getCurrentComponentData: (componentId) => {
    const compoents = get().components || [];
    const component = getElementById(compoents, componentId) as
      | Component
      | undefined;
    return component?._runTimeContext?.globalState;
  },
  getCurrentComponentDataByUplevel: (component, upLevel = 1) => {
    const compoents = get().components || [];
    let currentCompoent = component;
    let currentId = component.id;
    while (upLevel && currentCompoent) {
      // 通过currentCompoent限制是否到顶层
      currentId = currentCompoent.parentId;
      upLevel--;
      currentCompoent = getElementById(compoents, currentId);
    }
    return currentCompoent?._runTimeContext?.globalState;
  },
}));
