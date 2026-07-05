import {Button, Input, Label, SelectItem} from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import {Header, ListBox, Select, Separator} from "@heroui/react";
import *as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

const schema=zod.object({
    name: zod.string().nonempty('Is Required').min(2,"min length 2").max(10,'max length 10'),
    email:zod.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password:zod.string().nonempty('Is Required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    rePassword:zod.string().nonempty('Is Required'),
    dateOfBirth:zod.coerce.date().refine(value=>{
      const age=value.getFullYear();
      const now=new Date().getFullYear();
      return now-age>18
    },'small than 18'),
    gender:zod.string().nonempty('Is Required')
   
}).refine(data=>data.password===data.rePassword ,{path:["rePassword"],  message: "Passwords do not match"})
function Register() { 
 
const {register,control,handleSubmit,formState:{errors,touchedFields}}=useForm({
  defaultValues:{
    name: "",
    email:"",
    password:"",
    rePassword:"",
    dateOfBirth:"",
    gender:""
  },
  resolver:zodResolver(schema),
  mode:'onBlur',
  reValidateMode:'onBlur',

})

  function signUp(values){
    console.log("hello",values);
  }

  return (
    <div className="h-screen flex items-center justify-center">
      
     <form onSubmit={handleSubmit(signUp)} className="flex w-80 flex-col gap-4 bg-slate-500 rounded-2xl p-4">

    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input label="Name" type="text" errorMessage={errors.name?.message} isInvalid={Boolean(errors.name)} {...register('name')} /> 
    </div>
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input label="Email" type="email"  errorMessage={errors.email?.message} isInvalid={Boolean(errors.email&&touchedFields.email)} {...register('email')} /> 
    </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input label="Password" type="password"  errorMessage={errors.password?.message} isInvalid={Boolean(errors.password&&touchedFields.password)} {...register('password')} /> 
    </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input label="rePassword" type="password"  errorMessage={errors.rePassword?.message} isInvalid={Boolean(errors.rePassword&&touchedFields.rePassword)} {...register('rePassword')} /> 
    </div>
<div className="flex gap-4">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input label="dateOfBirth" type="date"  errorMessage={errors.dateOfBirth?.message} isInvalid={Boolean(errors.dateOfBirth&&touchedFields.dateOfBirth)} {...register('dateOfBirth')} /> 
    </div>
<Controller
  name="gender"
  control={control}
  render={({ field }) => (
    <Select
      label="Gender"
      selectedKeys={field.value ? [field.value] : []}
      onSelectionChange={(keys) => {
        field.onChange(Array.from(keys)[0]);
      }}
      isInvalid={errors.gender}
      errorMessage={errors.gender?.message}
    >
      <SelectItem key="male">Male</SelectItem>
      <SelectItem key="female">Female</SelectItem>
    </Select>
  )}
/>
</div>

<Button type="submit">Register</Button>
 


    </form>
    </div>
  )
}

export default Register
