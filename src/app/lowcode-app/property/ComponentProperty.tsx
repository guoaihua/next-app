import { useComponentsStore } from "@/app/lowcode-app/store/components";
import { useComponentsConfigStore } from "@/app/lowcode-app/store/components-configs";
import { useEffect, useMemo } from "react";
import { Button, Card, Form, Input, Select, Switch } from "antd";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export const ComponentProperty = () => {
  const { currentComponentId, currentComponent, updataComponentProps } =
    useComponentsStore();
  const { componentsMap } = useComponentsConfigStore();
  const [form] = Form.useForm();

  const renderForm = ({ type, props }: { type: string; props: any }) => {
    switch (type) {
      case "input":
        return <Input {...props} />;
      case "select":
        return <Select {...props} />;
      case "switch":
        return <Switch {...props} />;
      case "textarea":
        return <TextArea {...props} />;
      case "inputNumber":
        return <Input {...props} type="number" />;
    }
  };

  useEffect(() => {
    if (!currentComponent) {
      return;
    }
    // 清空表单
    form.resetFields();
    form.setFieldsValue({ ...currentComponent?.userCustomConfigProps });
  }, [currentComponent]);

  const currentProperty = useMemo(() => {
    if (!currentComponent) {
      return;
    }
    const component = componentsMap[currentComponent?.type];
    return component?.setter;
  }, [currentComponent]);

  if (!currentComponentId) {
    return;
  }

  const handleValueChange = (changedValues, allValues) => {
    // 将字段值更新到compoent中
    updataComponentProps(currentComponentId, allValues);
  };

  return (
    <Card title={null}>
      <Form {...layout} form={form} onValuesChange={handleValueChange}>
        {currentProperty?.map((v, index) => {
          return (
            <Form.Item
              key={index}
              name={v.name}
              label={v.label}
              rules={[{ required: true }]}
            >
              {renderForm({ type: v.type, props: v.props })}
            </Form.Item>
          );
        })}
      </Form>
    </Card>
  );
};
