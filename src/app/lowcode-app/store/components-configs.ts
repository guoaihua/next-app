"use client";

import { create } from "zustand";
import Components from "@/app/lowcode-app/material-components";
import { ComponentConfig } from "@lowcode/types/materials";

type State = {
  componentsMap: Record<string, ComponentConfig>;
};

type Actions = {
  registerComponent?: (componentsMap: any) => void;
};
/**
 * 存储物料库注册的组件map
 */
export const useComponentsConfigStore = create<State & Actions>((set, get) => ({
  componentsMap: Components,
  registerComponent: (componentsMap) => {
    set({
      componentsMap,
    });
  },
}));
