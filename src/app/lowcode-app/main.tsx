"use client"
import './index.css'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import App from './App'

export default function main(){
    return (
    <DndProvider backend={HTML5Backend}>
        <App />
    </DndProvider>
    )
}