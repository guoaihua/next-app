"use client"

import { create } from 'zustand'

// 这里原代码导入的 Button 不存在，且未被使用，推测可能是要在 componentsMap 中添加 button 组件配置
// 因此删除该导入语句，后续在 componentsMap 中补充 button 组件配置
import Components from '@/app/lowcode-app/components'
import { Classify } from "@lowcode/types/materials"

export interface ComponentConfig {
    name: string
    type: string
    classify?: Classify
    component: any
    defaultProps?: Record<string, any>
    setter?: ComponentSetter[]
    stylesSetter?: ComponentSetter[]
    events?: ComponentEvent[]
    methods?: ComponentMethods[]
}

export interface ComponentSetter {
    name: string
    label: string
    type: string
    props?: Record<string, any>
}


export interface ComponentEvent {
    name: string
    label: string
}

export interface ComponentMethods {
    name: string
    label: string
}




type State = {
    componentsMap: Record<string, ComponentConfig>
}


type Actions = {
    registerComponent?: (componentsMap: any) => void
}
/**
 * 存储物料库注册的组件map
 */
export const useComponentsConfigStore = create<State & Actions>((set, get) => ({
    componentsMap: Components,
    registerComponent: (componentsMap) => {
        set({
            componentsMap
        })
    }
}))


