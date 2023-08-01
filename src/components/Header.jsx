import { Link } from "react-router-dom";
import { BiSolidOffer } from "react-icons/bi";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { IoMdHelpBuoy } from "react-icons/io";
 import {fetchCoords} from '../utils/coordsSlice';
 import { setLatitude,setLongitude } from "../utils/coordsSlice";
import { BsFillCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import SearchCity from "./SearchCity";
import { useEffect, useState } from "react";

const Title = () => (
  <div className="flex items-center">
    <Link to="/">
      <h2 className="text-xl font-bold text-gray-500 mx-2">
        Hunger<span className="text-orange-600">Head</span>
      </h2>
    </Link>

    <img
      className="h-14"
      alt="logo"
      src="https://cdn-icons-png.flaticon.com/512/683/683071.png"
    />
  </div>
);

const Header = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch =useDispatch();
  const {latitude,longitude,searchedCity} = useSelector(
    (store) => store.coords
  );
  const [city,setCity] =useState("");
  
  const searchRestaurants = ()=>{
    dispatch(fetchCoords(city));
    setCity("")
  }

  //fetching the current coordiantes
  const getCurrCoords = ()=>{
    if("geolocation" in navigator && latitude==null && longitude==null){
      navigator.geolocation.getCurrentPosition(
        (position)=>{
        dispatch(setLatitude(position.coords.latitude));
        dispatch(setLongitude(position.coords.longitude));
      },(error)=>{
        console.log("Error",error)
      })
    }else{
      console.error("Geolocation is not supported by this browser.");
    }
  }

  useEffect(()=>{
    getCurrCoords();
  },[])

  return (
    <div className="flex items-center justify-between border py-2">
      <div className="flex items-center">
        <Title />
        <SearchCity searchRestaurants={searchRestaurants}
        setCity={setCity} 
        city={city}/>
        
      </div>
      <div className="mx-6">
        <ul className="flex">
          <Link to="/">
            <li className="px-6 text-medium font-semibold flex items-center text-gray-600 hover:text-orange-600 ">
              <BiSolidOffer
                style={{ fontSize: "1.5rem", marginRight: "8px" }}
              />
              Offers
            </li>
          </Link>
          <Link to="/about">
            <li className="px-6 text-medium font-semibold flex items-center text-gray-600 hover:text-orange-600 ">
              <BsFillInfoSquareFill
                style={{ fontSize: "1rem", marginRight: "8px" }}
              />
              About
            </li>
          </Link>
          <Link to="/support">
            <li className="px-6 text-medium font-semibold flex items-center text-gray-600 hover:text-orange-600 ">
              <IoMdHelpBuoy
                style={{ fontSize: "1.5rem", marginRight: "8px" }}
              />
              Help
            </li>
          </Link>

          <Link to="/cart">
            <li className="px-6 text-medium font-semibold flex items-center text-gray-600 hover:text-orange-600 ">
              <BsFillCartFill
                style={{ fontSize: "1.5rem", marginRight: "8px" }}
              />
              Cart
              <div className="ml-2.5 mb-1  text-xs text-white absolute font-semibold  ">
                {cartItems.length === 0 ? "" : cartItems.length}
              </div>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
