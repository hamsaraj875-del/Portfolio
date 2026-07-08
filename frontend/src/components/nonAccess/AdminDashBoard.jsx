import {useEffect} from "react";


const AdminDashBoard = ()=>{
  useEffect(()=>{
    const controller = AbortController();
    const signal = controller.signal;

    const fetcher = async()=>{
      const response = await fetch("http://localhost:3000/admin/data");
      const data = await response.json();
      
    }
  })
  
  return(
    <>
    
    </>
  )
}