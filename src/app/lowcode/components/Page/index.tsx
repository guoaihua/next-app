"use client"

import { CSSProperties, PropsWithChildren } from "react"
import { useApplyDrop } from "@lowcode/hooks/useApplyDrop"

export const Page = (props: PropsWithChildren<{ id: number, styles: CSSProperties }>) => {
    const { id, styles, ...resetProps } = props
    const { ref } = useApplyDrop({ accept: ['button', 'container', 'modal'], id })

    return (
        <div {...resetProps} style={styles} data-component-id={id} className="page w-full h-full" ref={ref}>{props?.children}</div>
    )
}

