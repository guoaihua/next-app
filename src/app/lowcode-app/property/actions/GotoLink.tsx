import { Input } from "antd"
import { useState } from "react";

export const GoToLink = (props: { defaultValue?: string, onChange: ({url, type}: {url: string, type: string, desc: string})=> void})=>{
    const { defaultValue, onChange } = props
    const [value, setValue] = useState(defaultValue)

    function handleChange(event) {
        const value = event.target.value
        setValue(value)
        onChange({
            type: 'goToLink',
            url: value,
            desc: '跳转链接'
        })
    }
 return  (
     <>
         {
             <div className='mt-[10px]'>
                 <div className='flex items-center gap-[10px]'>
                     <div>链接</div>
                     <div>
                         <Input
                             onChange={handleChange}
                             value={value || ''}
                         />
                     </div>
                 </div>
             </div>
         }

     </>
 ) 
}