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
  /** 运行时的上下文, 与组件相关联需要动态设置的状态 */
  _runTimeContext?: Record<string, any>
  /** 动态插值，从全局变量取值 */
  dynamicProps?: Record<string, any>
}

export interface ComponentsBase {
  styles?: CSSProperties
  id?: number
  _runTimeContext?: Record<string, any>
}

