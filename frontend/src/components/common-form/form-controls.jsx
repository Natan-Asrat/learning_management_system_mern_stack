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
  
const FormControls = ({formControls=[], formData, setFormData}) => {
  function renderComponentByType(getControlItem){
    let element = null
    switch(getControlItem.componentType){
        case "input":
            element = <Input 
             id={getControlItem.name} 
             name={getControlItem.name} 
             placeholder={getControlItem.placeholder} 
             type={getControlItem.type} 
              
             />
             break
        case 'select':
            element = <Select>
                <SelectTrigger className="w-full">
                    <SelectValue 
                    placeholder={getControlItem.label}

                    >

                    </SelectValue>
                </SelectTrigger>
                <SelectContext>
                    {
                        (getControlItem.options && getControlItem.options.length > 0) 
                        ? 
                        getControlItem.options.map(optionItem => {
                            <SelectItem key={optionItem.id} value={optionItem.id} />
                            
                        })
                        : 
                        null
                    }
                </SelectContext>
            </Select>
            break
        case 'textarea':
            element = <TextArea 
            id={getControlItem.name} 
            name={getControlItem.name} 
             placeholder={getControlItem.placeholder} 
            />
        default:
            element = <Input id={getControlItem.name} 
            name={getControlItem.name} 
            placeholder={getControlItem.placeholder} 
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