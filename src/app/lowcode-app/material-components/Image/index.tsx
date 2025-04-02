import { RunTimeImage } from "./RunTimeImage";
import { EditImage as _editImage } from "./EditImage";
import config from "./config";

export const EditImage = {
  ...config,
  component: _editImage,
};
