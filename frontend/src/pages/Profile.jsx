import React, { useState } from "react";
import Avatar from "../components/Avatar";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { animate, motion } from "framer-motion";

const Profile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
  return (
    <motion.div
    initial={{opacity:0 , scale:0.5}}
    animate={{opacity:1, scale:1}}
    transition={{
      duration: 0.8,
      delay: 0.5,
      ease: [0, 0.70, 0.1, 1.01]
    }}
    >
    <div className="h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className=" border shadow-md rounded-lg bg-white p-2 w-80 px-4">
          <div className="pl-[6.5rem]">
            <Avatar size={"90px"} />
          </div>
          <div className="w-full">
            <InputBox placeholder={"John Doe"} label={"First Name"} />
            <InputBox placeholder={"John Doe"} label={"Last Name"} />
        </div>
        <div className="mt-7">
        <Button onClick={()=>{
            setFirstName(firstName);
            setLastName(lastName);
        }} label={"Save"} />
        </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default Profile;
