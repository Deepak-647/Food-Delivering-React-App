import RestrauntCard from "./RestrauntCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";
import { useSelector } from "react-redux";


const Body = () => {
  const [allRestraunts, setAllRestraunts] = useState([]);
  const [filteredRestraunts, setFilteredRestraunts] = useState([]);
  const[cityTitle,setCityTitle]=useState("");
  const [searchTxt, setSearchTxt] = useState("");
  const {latitude,longitude} =useSelector((store)=>store.coords);
  console.log(latitude,longitude)


  useEffect(() => {
    getRestraunts();
  }, [latitude, longitude]);

  
  async function getRestraunts() {
    const data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}`
    );
     
    const json = await data.json();
    
    console.log("data",json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    setCityTitle(json?.data?.cards[2]?.card?.card?.header?.title);
     
    setAllRestraunts(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestraunts(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  }
 
   const isOnline = useOnline();

   if(!isOnline){
    return <h1>Offline , please check your internet connection !!</h1>
   }

  if (!allRestraunts) return <Shimmer/>;
  if (filteredRestraunts?.length === 0) return <Shimmer />;
  return allRestraunts?.length === 0 ? (
    <Shimmer />
  ) : ( 
    <>
      <div className="search-container">
        <div className="search-outline">
          <input
            type="text"
            className="search-input"
            placeholder="Search Restaurants"
            value={searchTxt}
            onChange={(e) => {
              setSearchTxt(e.target.value);
               
            }}
          />
          <button
            className="search-btn"
            onClick={() => {
              const data = filterData(searchTxt, allRestraunts);
               
              setFilteredRestraunts(data);
              
            }}
          >
            <BsSearch />
          </button>
        </div>
      <h1 className="text-2xl font-semibold">{cityTitle}</h1>
    

      </div>
       
       
      
      <div className="restraunt-list">
        {filteredRestraunts.map((restraunt) => {
          return (
            <Link
              className="restraunt-link"
              to={"/restaurant/" + restraunt.info.id}
              key={restraunt.info.id}
            >
              <RestrauntCard data={restraunt.info} />
            </Link>
          );
        })}
      </div>
    </>
  );
};
export default Body;
