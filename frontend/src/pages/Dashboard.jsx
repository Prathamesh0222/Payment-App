
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios";
import { useEffect, useState } from "react";


export const Dashboard = () =>{
 const [balance,setBalance] = useState(0);
 useEffect(()=>{
    const fetchData = async() => {
      const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setBalance(parseFloat(response.data.balance).toFixed(2));
    }
    fetchData();
 },[])
  return <div>
  <div>
        <Appbar/>
    </div>
    <div className="m-8">
      <Balance value={balance} />
      <Users />
    </div>
    </div>
}