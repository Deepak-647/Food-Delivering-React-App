// It's is used to fetch the restaurantInfo & restaurantMenu from the api  
import { useState ,useEffect } from "react";
import {RES_MENU_API} from '../constants';

const useRestaurant = (resId)=>{
 const [restaurantInfo, setRestaurantInfo] = useState({});
 const [restaurantMenu,setRestaurantMenu] =useState({});

 useEffect(() => {
    getRestaurantInfo();
  }, []);
  async function getRestaurantInfo() {
    try {
      const data = await fetch(
        RES_MENU_API+resId
      );
      const json = await data.json();
      console.log(json.data);
      setRestaurantInfo(json?.data?.cards?.[0]?.card?.card?.info);
      setRestaurantMenu(
        json?.data?.cards?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards
      );
    } catch (error) {
      console.error("Error fetching restaurant info:", error);
    }
  }
  return {restaurantMenu , restaurantInfo};
}
export default useRestaurant;