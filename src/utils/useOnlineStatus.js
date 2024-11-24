import { useEffect, useState } from "react";

const useOnlineStatus =()=>{
    const[onlineStatus,setonlineStatus] = useState(true);
    //checking if online or offline
    useEffect(()=>{
        window.addEventListener("online", () => {
            setonlineStatus(true);
          });

          window.addEventListener("offline", () => {
            setonlineStatus(false);
          });

    },[]);
   
      
    return onlineStatus;
}

export default useOnlineStatus