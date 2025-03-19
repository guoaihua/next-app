
import { useComponentsStore } from '@lowcode/store/components'
import { useComponentsConfigStore } from '@lowcode/store/components-configs';
import { useEffect, useMemo } from 'react';
import { Button, Form, Input, Select } from "antd";
import { createElement } from 'react';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
};


export const ComponentProperty = ()=>{
    const { currentComponentId, currentComponent, updataComponentProps } = useComponentsStore()
    const { componentsMap } = useComponentsConfigStore()
    const [form] = Form.useForm();
    

    const renderForm = ({type, props}: {type: string, props: any})=>{
        switch(type){
            case 'input': 
              return <Input {...props}/>;
            case 'select':
              return <Select {...props}/>;
        }
    }

    useEffect(()=>{
        if(!currentComponent){return}
        form.setFieldsValue({...currentComponent?.userCustomConfigProps})
    },[currentComponent])


    const currentProperty = useMemo(()=>{
        if (!currentComponent){
            return
        }
        const component = componentsMap[currentComponent?.type]
        return component?.setter
    },[currentComponent])

    if (!currentComponentId){
        return 
    }

    const handleValueChange = (changedValues, allValues)=> {
        console.log('changedValues: ', changedValues);
        console.log('allValues: ', allValues);
        // 将字段值更新到compoent中
        updataComponentProps(currentComponentId, allValues)
    }

    return (
        <>
            <Form {...layout}
                form={form}
                onValuesChange={handleValueChange}
            >
             {
                    currentProperty?.map(v=> {
                        return (
                            <Form.Item name={v.name} label={v.label} rules={[{ required: true }]}>
                                {renderForm({type: v.type, props: v.props})}
                            </Form.Item>
                        )
                    }) 
             }
            </Form>
        </>
    )
}