"use client"
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import './index.css'
import App from './App'

export default function main(){
    return (
    <DndProvider backend={HTML5Backend}>
        <App />
    </DndProvider>
    )
}