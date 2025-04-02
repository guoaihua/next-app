import { Image as AntdImage } from "antd";
import config from "./config";
export const RunTimeImage = (props) => {
  const { imageSrc, name, id, styles, ...resetProps } = props ?? {};
  console.log("imageSrc", imageSrc, props);
  return (
    <div>
      <AntdImage style={styles} src={imageSrc}></AntdImage>
    </div>
  );
};

export const Image = {
  ...config,
  component: RunTimeImage,
};
