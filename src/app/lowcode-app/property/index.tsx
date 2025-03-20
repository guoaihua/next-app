"use client"

import { Segmented } from 'antd';
import { useState } from 'react';
import { ComponentProperty } from './ComponentProperty'
import { ComponentStyle } from './ComponentStyle'
import { ComponentEvent } from './ComponentEvent'

enum PropertyEnums {
    COMPONENT_PROPERTY,
    COMPONENT_STYLE,
    COMPONENT_EVENT
}

const OPTIONS = [
    {
        label: '组件属性',
        value: PropertyEnums.COMPONENT_PROPERTY
    },
    {
        label: '外观',
        value: PropertyEnums.COMPONENT_STYLE
    },
    {
        label: '事件',
        value: PropertyEnums.COMPONENT_EVENT
    }
]


const Property = ()=> {
    const [value, setValue] = useState<string | number>(PropertyEnums.COMPONENT_PROPERTY);

    return (
        <>
            <Segmented options={OPTIONS} value={value} onChange={setValue} block />
            {
                value === PropertyEnums.COMPONENT_PROPERTY && (
                    <ComponentProperty />
                )
            }
            {
                value === PropertyEnums.COMPONENT_STYLE && (
                    <ComponentStyle />
                )
            }
            {
                value === PropertyEnums.COMPONENT_EVENT && (
                    <ComponentEvent />
                )
            }
        </>
    )
}

export default Property;