
import { CSSProperties, PropsWithChildren } from "react"
import config from './config'
import { useResolveProps } from '@lowcode/hooks/useResolveProps'


const RunTimePage = (props: PropsWithChildren<{ id: number, styles: CSSProperties }>) => {
    const { styles, resetProps } = useResolveProps(props)

    return (
        <div {...resetProps} style={styles} className="page w-full h-full" >{props?.children}</div>
    )
}

export const Page = {
    ...config,
    component: RunTimePage,
}


export default RunTimePage
