"use client"

import { Allotment } from "allotment";
import "allotment/dist/style.css";
import './App.css'
import Materials from "@lowcode/materials/index"
import Editor from "@lowcode/editor/index";
import Property from "@lowcode/property/index";
import { Header } from '@lowcode/editor/Header'
import { useComponentsStore } from "@lowcode/store/components";
import { useComponentsConfigStore } from "@lowcode/store/components-configs";
import { Component } from '@lowcode/types/component'
import { createElement, ReactElement, ReactNode, useRef } from "react";

function App() {

  const { mode, components } = useComponentsStore()
  const { componentsMap } = useComponentsConfigStore()
  const componentRefs = useRef<Record<string, any>>({});


  // 将component 上存储的events 与配置中的events匹配，如果有则处理
  const handleEvents = (component: Component) => {
    const props: Record<string, any> = {} // 收集与事件相关的props，最终传递给createElement方法中的props: { 'onClick': f() }

    componentsMap[component.type].events?.forEach(event => {
      const actions = component.userCustomConfigEvents?.[event.name]?.actions
      if (actions?.length > 0) {
        props[event.name] = () => {
          // 事件队列依次处理
          actions.forEach((action => {
            const { type, url, code, componentId, method } = action
            if (type === 'goToLink' && url) {
              console.log(url)
              window.open(url, '_blank')
            } else if (type === 'customJs') {
              // window.eval(code)
              const func = new Function(code)
              func()
            } else if (type === 'componentMethod') {
              const component = componentRefs.current[componentId];

              if (component) {
                component[method]?.();
              }
            }
          }))
        }
      }
    })
    console.log('props: ', props);

    return props

  }


  const renderComponent = (components: Component[]): ReactNode | undefined => {
    if (!components || components?.length <= 0) {
      return
    }

    return components.map(component => {
      const configComponent = componentsMap[component.type]
      console.log('configComponent.component: ', configComponent.component);

      return createElement(configComponent.component, {
        key: component.id,
        ref: configComponent.component?.$$typeof === Symbol.for('react.forward_ref') ? (ref: Record<string, any>) => { componentRefs.current[component.id] = ref; } : undefined,
        styles: component.userCustomConfigStyles,
        name: configComponent.name,
        ...configComponent.defaultProps,
        ...component.userCustomConfigProps,
        ...handleEvents(component)
      },
        renderComponent(component.children)
      )
    })

  }

  return (
    <>
      <div className='h-[60px] flex items-center border-b-[1px] border-[#000]'>
        <Header />
      </div>
      {
        mode === 'edit' ? (
          <Allotment>
            <Allotment.Pane minSize={200}>
              <Materials />
            </Allotment.Pane>
            <Allotment.Pane>
              <Editor />
            </Allotment.Pane>
            <Allotment.Pane minSize={300}>
              <Property />
            </Allotment.Pane>
          </Allotment>
        ) : (
          renderComponent(components)
        )
      }

    </>
  )
}

export default App
