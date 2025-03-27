"use client"
import './index.css'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import App from './App'

// _app.js 或入口文件
if (typeof window !== 'undefined') {
    window.MonacoEnvironment = {
        getWorker: (workerId, label) => {
            // 根据标签生成完整的 Worker URL
            const workerMap = {
                json: `/monaco-editor/vs/language/json/json.worker.js`,
                css: `/monaco-editor/vs/language/css/css.worker.js`,
                html: `/monaco-editor/vs/language/html/html.worker.js`,
                typescript: `/monaco-editor/vs/language/typescript/ts.worker.js`,
                editor: `/monaco-editor/vs/editor/editor.worker.js`,
            };

            const workerUrl = workerMap[label] || workerMap.editor;
            return new Worker(workerUrl);
        },
    };
}

export default function main(){
    return (
    <DndProvider backend={HTML5Backend}>
        <App />
    </DndProvider>
    )
}