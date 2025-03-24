"use client"

import { create } from 'zustand'
import { Component } from '@/app/lowcode-app/types/component'
import { createId } from '@/app/lowcode-app/libs/uid'
import pick from "lodash-es/pick";

type State = {
    components: Component[]
    currentComponent: Component | undefined
    currentComponentId: number
    mode: string
}

type Actions = {
    addComponent: (newComponents: any, parentId: number) => void
    deleteComponent: (id: number) => void
    updataComponentProps: (id: number, props: Record<string, any>) => void
    updataComponentStyles: (id: number, styles: Record<string, any>) => void
    updateComponentEvents: (id: number, events: Record<string, any>) => void
    setCurrentComponent: (id?: number) => void
    findComponentById: (id: number) => Component | undefined
    findFatherComponents: (component: Component, res?: Component[]) => Component[]
    setMode: (mode: string) => void
}

/**
 * 当前实际添加的components
 */
export const useComponentsStore = create<State&Actions>((set, get) => ({
    components: [
        {
            type: 'page',
            name: '页面',
            id: createId(),
            children: [],
            userCustomConfigProps: {},
            userCustomConfigStyles: {},
            _runTimeContext: {}
        }
    ],
    mode: 'edit',
    setMode: (mode) => { set({ mode: mode }) },
    currentComponentId: 0,
    currentComponent: undefined,
    setCurrentComponent: (id) => set({ currentComponent: id ? getElementById(get()?.components, id) : undefined, currentComponentId: id }),
    findComponentById: (id) => getElementById(get()?.components, id),
    addComponent: (newComponent, parentId) => {
        const components = get()?.components
        const parent = getElementById(components, parentId)
        const obj = { ...pick(newComponent, ['type', 'name', 'defaultProps', 'children']), parentId: parent?.id }
        if(parent){
            if(parent.children){
                parent.children.push({ ...obj, id: createId()})
            }else {
                parent.children = [{...obj, id: createId()}]
            }
            set({ components: [...components] })
        }else {
            set({ components: [...components, { ...obj, id: createId() }] })
        }
    },
    deleteComponent: (id) => {
        const components = get()?.components
        const currentComponent = getElementById(components, id)
        const parent = getElementById(components, currentComponent?.parentId as number)
        if (parent) {
            parent.children = parent.children.filter(item => item.id !== id)
            set({ components: [...components] })
        }
    },
    updataComponentProps: (id, props) => {
        const components = get()?.components
        const currentComponent = getElementById(components, id)
        if (!currentComponent) { return }
        // 更新当前Props
        currentComponent.userCustomConfigProps = props
        set({ components: [...components] })
    },
    updataComponentStyles: (id, styles) => {
        const components = get()?.components
        const currentComponent = getElementById(components, id)
        if (!currentComponent) { return }
        // 更新当前Props
        currentComponent.userCustomConfigStyles = styles
        set({ components: [...components] })
    },
    updateComponentEvents: (id, events) => {
        const components = get()?.components
        const currentComponent = getElementById(components, id)
        if (!currentComponent) { return }
        // 更新当前Props
        currentComponent.userCustomConfigEvents = { ...currentComponent.userCustomConfigEvents, ...events }
        set({ components: [...components] })
    },
    findFatherComponents: (component, res = []) => {
        // if (!component.parentId) { return [] }
        const components = get()?.components
        if (component?.parentId) {
            const parentComponent = getElementById(components, component?.parentId) as Component
            return get().findFatherComponents(parentComponent, [...res, parentComponent])
        } else {
            return res
        }

    }
}))


// 根据Id查找元素
export const getElementById = (components: Component[], id: number): Component | undefined => {
    if (!components || !id) {
        return 
    }
    for(const component of components){
        if(component.id === id){
            return component
        }
        const result = getElementById(component.children, id)
        if(result){
            return result
        }
    }

}
