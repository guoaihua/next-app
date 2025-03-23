import { CSSProperties } from "react"
export interface Component {
  /** 组件类型 */
  type: string
  id: number
  children: Component[]
  parentId?: number
  name?: string
  userCustomConfigProps?: Record<string, any>
  userCustomConfigStyles?: CSSProperties
  userCustomConfigEvents?: Record<string, any>
}

export interface ComponentsBase {
  styles?: CSSProperties
  id?: number
}

