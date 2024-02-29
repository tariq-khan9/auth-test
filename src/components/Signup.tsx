
'use client'
import { registerUser } from '@/lib/actions/authActions'
import React, { useEffect, useRef} from 'react'

import {useForm} from 'react-hook-form'


// Prop Types for all props that is passed from User component to child (UserModal) component


type FormInputTypes = {
    name: string,
    email: string,
    password: string,
    ConfirmPass: string,
 
}



export const Signup = () => {
 
 
  const form = useForm<FormInputTypes>();
  const {register,handleSubmit, control, watch, formState, setValue} = form;
  const {errors} = formState;

  const passref = useRef({})
   passref.current = watch("password", '')



  

  const onSubmit = async(data: FormInputTypes) => {

    console.log(data)
        
    try{
      const result = await registerUser(data)
      console.log("user created")
    }
    catch(e){
         console.log(e)
    }

      
    }
      
    
    
  
 
 


  return (

          
            <div className='bg-[#172a3a] shadow-md shadow-[#09bc8a] rounded-md z-50  p-2 px-10 '> 
               <h2 className='mb-4 mt-1 font-bold text-gray-400 text-lg text-center'>Add New User</h2>
                <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)} noValidate >
                 <div className='flex flex-col space-y-4'>
                        <div className='name'>
                             <input type="text"   id="name" className="user-form-inputs" placeholder="Enter your name"  {...register("name", {
                                required: {
                                    value: true,
                                    message: 'name is required'
                                }, 
                                minLength: {
                                    value: 5,
                                    message: "name must be 5 word minimum"
                                }
                            })}  />
                            <p className='validation-error'>{errors.name?.message}</p> 
                        </div>
                        

                        <div className="email">
                            <input type="email"   id="email" className="user-form-inputs" placeholder="Enter your email"  {...register("email", {
                                required: {
                                    value: true,
                                    message: 'email is required'
                                }, 
                                pattern:{
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "email is not valid"
                                }
                            })}  />
                            <p className='validation-error'>{errors.email?.message}</p>  
                        </div>
                        

                        <div className="password">
                            <input placeholder='password' type="password"   id="password" className="user-form-inputs"   {...register("password", {
                                required: {
                                    value: true,
                                    message: 'password is required'
                                },
                                minLength: {
                                    value: 4,
                                    message: 'minimum 4 charectors required'
                                },
                                maxLength:{
                                    value: 14,
                                    message: 'maximum length is 14'
                                }
                            })}  />
                            <p className='validation-error'>{errors.password?.message}</p> 
                        </div>
{/* 
                        <div className="ConfirmPass">
                            <input placeholder='password' type="password"   id="confirmPass" className="user-form-inputs"   {...register("confirmPass", {
                                required: {
                                    value: true,
                                    message: 'password is required'
                                }
                             
                            })}  />
                            <p className='validation-error'>{errors.password?.message}</p> 
                        </div> */}

                
                    

                       
                </div>
                    <div className='flex flex-col xl:flex-row justify-between mt-4 mb-2'>
                        <button type="submit" className="text-white px-9 py-[5px] mt-2 bg-[#508991] hover:bg-[#3f6d73] focus:ring-4 focus:outline-none focus:ring-[#75dddd] font-medium rounded-full text-sm w-full sm:w-auto   text-center">submit</button>

                        <button type='button' className="text-white px-10 mt-2 bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto   text-center" onClick={()=> onClose()}>Close</button>
                    </div>
               
               
                </form>
             
            </div>
        
     
  )
}
