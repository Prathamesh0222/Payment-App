import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/SubHeading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { BottomWarning } from '../components/BottomWarning';
import {motion} from "framer-motion"
import axios from 'axios';

export const Signup = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className='bg-slate-500 h-screen flex justify-center'>
     <motion.div
     className='flex'
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.8,
      delay: 0.5,
      ease: [0, 0.70, 0.1, 1.01]
    }}
    >
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox onChange={(e)=>{
            setFirstName(e.target.value)
            }
          } placeholder={"John"} label={"First Name"}/>
          <InputBox onChange={(e)=>{
            setLastName(e.target.value)
          }} placeholder={"Doe"} label={"Last Name"}/>
          <InputBox onChange={(e)=>{
            setUsername(e.target.value)
          }} placeholder={"johndoe@gmail.com"} label={"Email"}/>
          <InputBox onChange={(e)=>{
            setPassword(e.target.value)
          }} placeholder={"123456"} label={"Password"} type={"password"}/>
          <div className='pt-4'>
          <Button onClick={async ()=>{
            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
              username,
              firstName,
              lastName,
              password
            })
            localStorage.setItem("token",response.data.token);
            navigate("/dashboard")
          }} label={"Sign Up"} />
          </div>
          <div className='flex justify-center'>
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
          </div>
        </div>
      </div>
      </motion.div>
    </div>
  )
}

