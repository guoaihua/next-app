"use client"

import { useComponentsStore } from '@/app/lowcode-app/store/components'
import { useComponentsConfigStore } from '@/app/lowcode-app/store/components-configs';
import React, { ReactNode, useState } from 'react';
import { Component } from '@/app/lowcode-app/types/component'
import { HoverMask } from './HoverMask'
import { ClickMask } from './CLickMask';


const Editor = () => {

    const [curHoverComponentId, setCurHoverComponentId] = useState<number>()

    const { components, setCurrentComponent, currentComponent, currentComponentId } = useComponentsStore()
    const { componentsMap } = useComponentsConfigStore()
    const renderComponent = (components: Component[]): ReactNode[] | undefined => {
        if (components?.length <= 0 || !components) {
            return
        }
        return components.map(component => {
            // 从配置中获取组件
            const Component = componentsMap[component.type]
            return React.createElement(Component?.component, {
                key: component.id,
                id: component.id,
                styles: component.userCustomConfigStyles, // 用户手动设置的样式属性
                name: Component?.name,
                ...Component?.defaultProps,
                ...component.userCustomConfigProps // 用户手动设置的属性
            }, renderComponent(component.children))
        })
    }

    // 支持hover事件，渲染浮层
    const handleHover = (e) => {
        // 获取事件最近的组件的componentId
        const componentId = e.target.closest('[data-component-id]')?.getAttribute('data-component-id')
        if (componentId) {
            setCurHoverComponentId(+componentId)
        }
    }

    // 支持点击事件，渲染浮层
    const handleClick = (e) => {
        // 获取事件最近的组件的componentId
        const componentId = e.target.closest('[data-component-id]')?.getAttribute('data-component-id')
        if (componentId) {
            setCurrentComponent(+componentId)
        }
    }

    // 离开时删除浮层
    const handleMouseLeave = () => {
        setCurHoverComponentId(undefined)
    }

    return (
        <div className='w-full h-full editor-container border relative overflow-y-auto p-5' onMouseOver={handleHover} onMouseLeave={handleMouseLeave} onClick={handleClick}>
            <div className='hover-wrapper'></div>
            {currentComponentId ? <ClickMask containerClassName='editor-container' wrapperClassName='hover-wrapper' curContainerId={currentComponentId} currentComponent={currentComponent} /> : null}
            {curHoverComponentId && currentComponentId !== curHoverComponentId && <HoverMask containerClassName='editor-container' wrapperClassName='hover-wrapper' curContainerId={curHoverComponentId} />}
            {renderComponent(components)}
        </div>
    )
}

export default Editor;