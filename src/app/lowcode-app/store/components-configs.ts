"use client"

import { create } from 'zustand'
import { Page, Container, Button, Modal } from '@/app/lowcode-app/components'


export interface ComponentConfig {
    name: string
    type: string
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

/**
 * 存储物料库注册的组件map
 */
export const useComponentsConfigStore = create<State>(()=> ({
    componentsMap: {
        page: {
            name: 'page 页面',
            type: 'page',
            component: Page,
            setter: [{
                name: 'title',
                label: '标题',
                type: 'input'
            }]
        },
       container: {
           name: '容器',
         type: 'container',
         component: Container,
           setter: [
               {
                   name: 'text',
                   label: '默认文本',
                   type: 'input'
               }
           ],
           stylesSetter: [
               {
                   name: 'width',
                   label: '宽度',
                   type: 'inputNumber',
               },
               {
                   name: 'height',
                   label: '高度',
                   type: 'inputNumber',
               }
           ]
       },
        button: {
            name: '按钮',
            type: 'button',
            component: Button,
            setter: [
                {
                    name: 'type',
                    label: '按钮类型',
                    type: 'select',
                    props: {
                        options: [
                            { label: '主按钮', value: 'primary' },
                            { label: '次按钮', value: 'default' }
                        ]
                    }
                },
                {
                    name: 'text',
                    label: '文本',
                    type: 'input'
                }
            ],
            stylesSetter: [
                {
                    name: 'width',
                    label: '宽度',
                    type: 'inputNumber',
                },
                {
                    name: 'height',
                    label: '高度',
                    type: 'inputNumber',
                }
            ],
            events: [
                {
                    name: 'onClick',
                    label: '点击事件'
                },
                {
                    name: 'onDoubleClick',
                    label: '双击事件'
                },
            ]
        },
        modal: {
            name: '弹窗',
            type: 'modal',
            component: Modal,
            methods: [
                {
                    name: 'open',
                    label: '打开弹窗'
                },
                {
                    name: 'close',
                    label: '关闭弹窗'
                }
            ]
        }
    }
}))