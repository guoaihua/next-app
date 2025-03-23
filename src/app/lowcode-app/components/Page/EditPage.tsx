import RunTimePage from "./RunTimePage";
import { useApplyDrop } from "@/app/lowcode-app/hooks/useApplyDrop"
import { CSSProperties, PropsWithChildren } from "react"

export const EditPage = (props: PropsWithChildren<{ id: number, styles: CSSProperties }>) => {
    const { id } = props
    const { ref } = useApplyDrop({ accept: ['button', 'container', 'modal', 'text', 'card', 'search'], id })

    return (
        <div ref={ref} className="page w-full h-full">
            <RunTimePage {...props} />
        </div>
    )
}