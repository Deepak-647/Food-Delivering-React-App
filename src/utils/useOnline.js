//It is used to check wheather the user is online or not

import { useEffect, useState } from "react";

const useOnline = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {

    const handleOnline = () =>{
      setIsOnline(true);
    }
    const handleOffline = () =>{
      setIsOnline(false);
    }
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    //cleaning the eventLsteners
    return() =>{
      window.removeEventListener("online",handleOnline);
      window.removeEventListener("offline",handleOffline);
      
    }
  }, []);
  return isOnline;
};

export default useOnline;
