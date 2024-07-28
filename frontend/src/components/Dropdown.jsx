import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dropdown = () => {
  const Navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/signin")
  }

    const Menu = ["Profile","Logout"]
  return (
    <div className='mt-2'>
    <div className='border rounded-md text-[14px] font-semibold p-2'>
    {
        Menu.map((menu,index)=>{
            return <div className='rounded-lg p-2 hover:bg-gray-500' key={index} onClick={menu === 'Logout' ? handleLogout : null } >{menu}</div>
        })
    }
    </div>
    </div>
  )
}

export default Dropdown