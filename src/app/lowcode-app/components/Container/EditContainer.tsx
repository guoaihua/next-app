import { CSSProperties, PropsWithChildren } from "react"
import { useApplyDrop } from "@/app/lowcode-app/hooks/useApplyDrop"
import classNames from "classnames"
import './index.scss'
import RuntimeContainer from "./RunTimeContainer"

export const EditContainer = (props: PropsWithChildren<{ id: number, styles: CSSProperties, isFlex: boolean }>) => {
    const { id } = props
    const { ref } = useApplyDrop({ accept: ['button', 'container', 'text', 'card', 'search'], id })
    return (
        <div ref={ref} className=" w-full h-full">
            <RuntimeContainer {...props} />
        </div>
    )
}

