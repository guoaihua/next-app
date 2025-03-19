
import { useComponentsStore } from '@lowcode/store/components'
import { useComponentsConfigStore } from '@lowcode/store/components-configs';
import { useEffect, useMemo, useState } from "react";
import { Form, Input, Select, InputNumber } from "antd";
import CssEditor from "./CssEditor";
// import { camelCase, debounce, kebabCase, keys } from 'lodash-es';
import camelCase from "lodash-es/camelCase";
import debounce from "lodash-es/debounce";
import kebabCase from "lodash-es/kebabCase";
import parse from "style-to-object";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export const ComponentStyle = () => {
  const { currentComponentId, currentComponent, updataComponentStyles } =
    useComponentsStore();
  const { componentsMap } = useComponentsConfigStore();
  const [form] = Form.useForm();
  const [css, setCss] = useState(`.comp{\n\n}`);

  const renderForm = ({ type, props }: { type: string; props: any }) => {
    switch (type) {
      case "input":
        return <Input {...props} />;
      case "select":
        return <Select {...props} />;
      case "inputNumber":
        return <InputNumber {...props} />;
    }
  };

  useEffect(() => {
    if (!currentComponent) {
      return;
    }
    form.resetFields();
    console.log(
      "currentComponent?.userCustomConfigStyles: ",
      currentComponent?.userCustomConfigStyles
    );
    if (currentComponent?.userCustomConfigStyles) {
      form.setFieldsValue({ ...currentComponent?.userCustomConfigStyles });
      setCss(toCSSStr(currentComponent?.userCustomConfigStyles));
    }
  }, [currentComponent]);

  function toCSSStr(css: Record<string, any>) {
    let str = `.comp {\n
`;

    Object.keys(css)?.forEach((item) => {
      let resolveValue = css[item];
      // 空值无需渲染
      if (!resolveValue) {
        return;
      }
      // 处理数值自动添加px, 防止回填时没有px参数
      if (/^margin|padding|width|height|top|left|right|bottom$/.test(item)) {
        resolveValue = isNaN(resolveValue) ? resolveValue : `${resolveValue}px`;
      }
      str += `\t${kebabCase(item)}: ${resolveValue};\n`;
    });

    str += `}`;
    console.log("str: ", str);
    return str;
  }

  const stylesSetter = useMemo(() => {
    if (!currentComponent) {
      return;
    }
    const component = componentsMap[currentComponent?.type];
    return component?.stylesSetter;
  }, [currentComponent]);

  if (!currentComponentId) {
    return;
  }

  const handleValueChange = (changedValues: any, allValues: any) => {
    console.log("allValues: ", allValues);

    // 将字段值更新到compoent中
    updataComponentStyles(currentComponentId, allValues);
  };

  const handleCssEditor = debounce((value) => {
    console.log("value: ", value);
    setCss(value);
    try {
      const cssStr = value?.replace(/(\.?[^{]+{)/, "")?.replace(/}/, "");
      const cssObj: Record<string, any> = {};
      parse(cssStr, (name, value) => {
        cssObj[camelCase(name)] = value; //react组件需要短横线转驼峰
      });

      console.log("css: ", cssObj);
      updataComponentStyles(currentComponentId, {
        ...form.getFieldsValue(),
        ...cssObj,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }, 500);
  return (
    <>
      <Form {...layout} form={form} onValuesChange={handleValueChange}>
        {stylesSetter?.map((v) => {
          return (
            <Form.Item
              name={v.name}
              label={v.label}
              rules={[{ required: true }]}
            >
              {renderForm({ type: v.type, props: v.props })}
            </Form.Item>
          );
        })}
        <div className="h-[200px] border-[1px] border-[#ccc]">
          <CssEditor value={css} onChange={handleCssEditor} />
        </div>
      </Form>
    </>
  );
};