"use client"
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import './App.css'
import Materials from "@/app/lowcode-app/materials/index"
import Editor from "@/app/lowcode-app/editor/index";
import Property from "@/app/lowcode-app/property/index";
import { Header } from '@/app/lowcode-app/editor/Header'
import { useComponentsStore } from "@/app/lowcode-app/store/components";
import { useComponentsConfigStore } from "@/app/lowcode-app/store/components-configs";

import RenderPage from "./render-core";

function App() {

  const { mode, components } = useComponentsStore()
  const { componentsMap } = useComponentsConfigStore()
  return (
    <>
      <div className='h-[60px] flex items-center border-b-[1px] border-[#e8e9eb]'>
        <Header />
      </div>
      {
        mode === 'edit' ? (
          <Allotment>
            <Allotment.Pane minSize={200}>
              <Materials />
            </Allotment.Pane>
            <Allotment.Pane minSize={200}>
              <Editor />
            </Allotment.Pane>
            <Allotment.Pane minSize={300}>
              <Property />
            </Allotment.Pane>
          </Allotment>
        ) : (
            <RenderPage components={components} componentsMap={componentsMap} />
        )
      }

    </>
  )
}

export default App
