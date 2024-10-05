import React from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { Textarea } from "@/components/ui/textarea"

const FormControls = ({formControls=[], formData, setFormData}) => {
  function renderComponentByType(getControlItem){
    let element = null
    const value = formData[getControlItem.name]
    switch(getControlItem.componentType){
        case "input":
            element = <Input 
             id={getControlItem.name} 
             name={getControlItem.name} 
             placeholder={getControlItem.placeholder} 
             type={getControlItem.type} 
              value={value}
              onChange={(e) => setFormData({...formData, [getControlItem.name]: e.target.value})}
             />
             break
        case 'select':
            element = <Select
            value={value}
            onValueChange={(value) => setFormData({...formData, [getControlItem.name]: value})}
            >
                <SelectTrigger className="w-full">
                    <SelectValue 
                    placeholder={getControlItem.label}

                    >

                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {
                        (getControlItem.options && getControlItem.options.length > 0) 
                        ? 
                        getControlItem.options.map(optionItem => {
                            <SelectItem key={optionItem.id} value={optionItem.id} />
                            
                        })
                        : 
                        null
                    }
                </SelectContent>
            </Select>
            break
        case 'textarea':
            element = <Textarea 
            id={getControlItem.name} 
            name={getControlItem.name} 
             placeholder={getControlItem.placeholder} 
             value={value}
             onChange={(e) => setFormData({...formData, [getControlItem.name]: e.target.value})}
           />
        default:
            element = <Input id={getControlItem.name} 
            name={getControlItem.name} 
            placeholder={getControlItem.placeholder} 
            value={value}
            onChange={(e) => setFormData({...formData, [getControlItem.name]: e.target.value})}
          />
    }
    return element
  
  }
    return (
    <div className="flex flex-col gap-3">
        {
            formControls.map(controlItem=>{
                return (<div key={controlItem.name}>

                    <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
                    {renderComponentByType(controlItem)}

                </div>)
            })
        }
    </div>
  )
}

export default FormControls