'use client'
import React, { createContext, useState } from "react";

// export interface FormContextType {
//     formData: any[];
//     updateFormData: (value: any) => void;
//   }
interface FormData {
    name: string;
    age: number;
}

export const FormContext: any = createContext({name: 'lll', age: 4});;


const FormProvider = ({children}: any) => {

    const [formData, setFormData] = useState<any>({name: 'lll', age: 4});

    const updateFormData = (key: string, value: any) => {
      setFormData({...formData, [key]: value} );
    };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
    {children}
  </FormContext.Provider>
  )
}

export default FormProvider