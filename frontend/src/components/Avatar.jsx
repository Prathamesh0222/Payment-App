import React, { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import axios from "axios";
import { useFetchUser } from "../hooks/useFetchUser";

const Avatar = ({ size }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const firstName = useFetchUser();

  const handleClinkOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClinkOutside);
    return () => {
      document.removeEventListener("click", handleClinkOutside);
    };
  }, []);

 

  return (
    <div ref={dropdownRef}>
      <div
        className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 cursor-pointer hover:bg-slate-500"
        style={{ width: size, height: size }}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="flex flex-col justify-center h-full text-xl">
          {firstName ? firstName[0].toUpperCase(): ""}
        </div>
      </div>
      {open && (
        <div className="absolute right-0 mt-2 w-48">
          <Dropdown />
        </div>
      )}
    </div>
  );
};

export default Avatar;
