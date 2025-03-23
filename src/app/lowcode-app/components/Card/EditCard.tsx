import RunTimeCard from './RunTimeCard'
import { PropsWithChildren } from "react"
import { ComponentsBase } from '@lowcode/types/component'
import { useApplyDrop } from "@/app/lowcode-app/hooks/useApplyDrop"

export const EditCard = (props: PropsWithChildren<{} & ComponentsBase>) => {
    const { id } = props
    const { ref } = useApplyDrop({ accept: ['button', 'container', 'text'], id })
    return (
        <div ref={ref}>
            <RunTimeCard {...props} />
        </div>
    )
}