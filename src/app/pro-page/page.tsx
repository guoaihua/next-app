"use client"
import RenderPage from "@lowcode/render-core";
import { useComponentsConfigStore } from "@/app/lowcode-app/store/components-for-render";
import { useEffect, useState } from "react";

function PreviewPage() {
    const { componentsMap } = useComponentsConfigStore()
    const [components, setComponents] = useState([])
    console.log('componentsMap: ', componentsMap);
    useEffect(() => {
        const components = JSON.parse(localStorage.getItem('lowcode-version'))
        setComponents(components)
    }, [])


    return (
        <>
            {components.length > 0 ? <RenderPage components={components} componentsMap={componentsMap} /> : null}
        </>
    )
}

export default PreviewPage