"use client";

import { create } from "zustand";
import Components from "@/app/lowcode-app/material-components";
import { Classify } from "@lowcode/types/materials";

export interface ComponentConfig {
  name: string;
  type: string;
  classify?: Classify;
  component: any;
  defaultProps?: Record<string, any>;
  setter?: ComponentSetter[];
  stylesSetter?: ComponentSetter[];
  events?: ComponentEvent[];
  methods?: ComponentMethods[];
}

export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  props?: Record<string, any>;
}

export interface ComponentEvent {
  name: string;
  label: string;
}

export interface ComponentMethods {
  name: string;
  label: string;
}

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
