import { useEffect, useState } from "react";
import { useComponentsStore } from "@/app/lowcode-app/store/components";
import { Select, TreeSelect } from "antd";
import { useComponentsConfigStore } from '@/app/lowcode-app/store/components-configs'


export interface ComponentMethodProps {
    value?: any
    onChange?: (config: any) => void
}

export function ComponentMethod(props: ComponentMethodProps) {

    const { value, onChange } = props;
    const { components, findComponentById, currentComponentId } = useComponentsStore();
    const { componentsMap } = useComponentsConfigStore();
    const [selectedComponent, setSelectedComponent] = useState<any>();

    const [curId, setCurId] = useState<number>();
    const [curMethod, setCurMethod] = useState<string>();


    useEffect(() => {
        if (value) {
            setCurId(value.componentId)
            setCurMethod(value.method)
            setSelectedComponent(findComponentById(value.componentId))
        }
    }, [value]);


    function componentChange(value: number) {
        if (!currentComponentId) return;

        setCurId(value);
        setSelectedComponent(findComponentById(value))
    }

    function componentMethodChange(value: string) {
        if (!currentComponentId || !selectedComponent) return;

        setCurMethod(value);

        onChange?.({
            type: 'componentMethod',
            componentId: selectedComponent?.id,
            method: value,
            desc: '组件方法'
        })
    }

    return <div className='mt-[40px]'>
        <div className='flex items-center gap-[10px]'>
            <div>组件：</div>
            <div>
                <TreeSelect
                    style={{ width: 500, height: 50 }}
                    treeData={components}
                    fieldNames={{
                        label: 'name',
                        value: 'id',
                    }}
                    value={curId}
                    onChange={(value) => { componentChange(value) }}
                />
            </div>
        </div>
        {componentsMap[selectedComponent?.type || ''] && (
            <div className='flex items-center gap-[10px] mt-[20px] w-[80%]'>
                <div>方法：</div>
                <div>
                    <Select
                        style={{ width: 500, height: 50 }}
                        options={componentsMap[selectedComponent?.type || ''].methods?.map(
                            method => ({ label: method.label, value: method.name })
                        )}
                        value={curMethod}
                        onChange={(value) => { componentMethodChange(value) }}
                    />
                </div>
            </div>
        )}
    </div>
}

