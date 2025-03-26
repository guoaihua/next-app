"use client"
import './App.css'
import "allotment/dist/style.css";

import { Allotment } from "allotment";

import Materials from "@/app/lowcode-app/materials/index"
import Editor from "@/app/lowcode-app/editor/index";
import Property from "@/app/lowcode-app/property/index";
import { Header } from '@/app/lowcode-app/editor/Header'
import { useComponentsStore } from "@/app/lowcode-app/store/components";
import { useComponentsConfigStore } from "@/app/lowcode-app/store/components-configs";

import RenderPage from "../../render-core";

function App() {

  const { mode, components } = useComponentsStore()
  const { componentsMap } = useComponentsConfigStore()
  return (
    <>
      <div className='h-[60px] flex items-center border-b-[1px] border-[#e8e9eb]'>
        <Header />
      </div>
      <div className='h-[calc(100%-60px)]'>
      {
        mode === 'edit' ? (
          <Allotment>
            <Allotment.Pane minSize={250} preferredSize={346}>
              <Materials />
            </Allotment.Pane>
            <Allotment.Pane minSize={200}>
              <Editor />
            </Allotment.Pane>
            <Allotment.Pane minSize={300} maxSize={500}>
              <Property />
            </Allotment.Pane>
          </Allotment>
        ) : (
            <RenderPage components={components} componentsMap={componentsMap} />
        )
      }
      </div>
    </>
  )
}

export default App
