import { useEffect, useState } from "react";
import axios from "axios";


export const useFetchUser = () => {
    const [firstName, setFirstName] = useState("");
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:3000/api/v1/user/name", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            setFirstName(response.data.firstName);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
        fetchData();
      }, []);

      return firstName;
}