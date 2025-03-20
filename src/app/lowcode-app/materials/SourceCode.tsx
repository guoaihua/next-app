import Editor from '@monaco-editor/react'
import { useComponentsStore } from '@/app/lowcode-app/store/components'


export const SourceCode = ()=>{
    const {components} = useComponentsStore()
    return (
        <>
        <h3 className=' mb-2.5'>源码</h3>
        <Editor 
            height='100%'
            width={'95%'}
            defaultLanguage='json'
                value={JSON.stringify(components, null, 2)}
                options={
                    {
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        minimap: {
                            enabled: false,
                        },
                        scrollbar: {
                            verticalScrollbarSize: 6,
                            horizontalScrollbarSize: 6,
                        },
                        lineNumbers: 'off'
                    }
                }
        />
        </>
    )
}