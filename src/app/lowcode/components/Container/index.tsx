import { CSSProperties, PropsWithChildren } from "react"
import { useApplyDrop } from "@lowcode/hooks/useApplyDrop"
export const Container = (props: PropsWithChildren<{ id: number, styles: CSSProperties }>) => {
    const { id, styles } = props
    const { ref } = useApplyDrop({ accept: ['button', 'container'], id })
    return (
        <div ref={ref} data-component-id={id} style={styles} className="Container border-solid border border-indigo-200 h-50 w-2xs">{props?.children}</div>
    )
}

