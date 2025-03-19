import MonacoEditor, { OnMount, EditorProps } from '@monaco-editor/react'
import { useState } from 'react'
export const CustomJs = (props: { onChange: (config: any) => void, defaultValue?: string})=> {
    const { onChange, defaultValue } = props
    console.log('defaultValue: ', defaultValue);
    const [value, setValue] = useState(defaultValue)
    
    const handleEditorMount: OnMount = (editor, monaco) => {
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
            editor.getAction('editor.action.formatDocument')?.run()
        });
    }

    const handleChange = (value)=>{
        console.log('value: ', value);
        setValue(value)
        onChange({
            type: 'customJs',
            desc: '自定义js',
            code: value
        })
    }

    return (
        <>
            <div>自定义 JS</div>
            <MonacoEditor
                height='90%'
                width='100%'
                language='javascript'
                onMount={handleEditorMount}
                onChange={handleChange}
                value={value}
                options={
                    {
                        fontSize: 14,
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        minimap: {
                            enabled: false,
                        },
                        scrollbar: {
                            verticalScrollbarSize: 6,
                            horizontalScrollbarSize: 6,
                        },
                    }
                } />   

        </>
    )
}