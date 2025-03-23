import { Card as AntdCard } from "antd"
import { PropsWithChildren } from "react"
import { ComponentsBase } from '@lowcode/types/component'
import config from './config'
import { Select } from 'antd'

const RunTimeSearch = (props: { id: number, width: number, options: { value: string, label: string }[] } & ComponentsBase) => {
    const { id, styles, width, options, ...resetProps } = props
    console.log("options", options)
    return (
        <Select options={options} style={{ width, ...styles }} data-component-id={id} showSearch {...resetProps}></Select>
    )
}

export const Search = {
    ...config,
    component: RunTimeSearch
}

export default RunTimeSearch