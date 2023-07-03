import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../constants";
import { AiFillInfoCircle, AiFillStar } from "react-icons/ai";
import { CiDiscount1 } from "react-icons/ci";
import { FaRupeeSign } from "react-icons/fa";
import ShimmerRestaurantMenu from "./ShimmerRestaurantMenu";
import useRestaurant from "../utils/useResraurant";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";
import { Link } from "react-router-dom";
import {BsFillCartFill} from "react-icons/bs";

const RestaurantDetails = () => {
  const { resId } = useParams();
  const cartItems = useSelector((store) => store.cart.items);

  const { restaurantMenu, restaurantInfo } = useRestaurant(resId);

  const {
    name,
    areaName,
    avgRatingString,
    city,
    cuisines,
    cloudinaryImageId,
    feeDetails,
    aggregatedDiscountInfo,
    costForTwoMessage,
    totalRatingsString,
  } = restaurantInfo;

  const descriptionList = aggregatedDiscountInfo?.descriptionList || [];

  return Object.keys(restaurantInfo || restaurantMenu).length === 0 ? (
    <ShimmerRestaurantMenu />
  ) : (
    
    <div className="flex flex-col items-center ">
      <div className="flex items-center justify-around h-40 w-3/5 border-b-2">
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <div className="pt-2 pb-4">
            <p>{cuisines?.join(" , ")}</p>

            <p className="">
              {areaName} , {city}
            </p>
          </div>

          <div className="flex items-center">
            <AiFillInfoCircle style={{ color: "orange" }} />
            <p className="pl-2"> {feeDetails?.message}</p>
          </div>
        </div>

        <div>
          <img
            className="h-24"
            alt="restaurant-img"
            src={IMG_CDN_URL + cloudinaryImageId}
          />
          <div className="flex items-center">
            <div className="flex items-center pr-2 text-green-700 font-bold">
              <AiFillStar />
              <p>{avgRatingString}</p>
            </div>

            <p className="font-semibold text-gray-600">
              {" "}
              | {totalRatingsString}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-around w-3/5 border-b-2 py-4">
        <div className="flex items-center">
          <p className="text-base font-bold">{costForTwoMessage}</p>
        </div>
        <div className="flex items-center">
          {descriptionList.map((description) => {
            return (
              <div className="flex  items-center border p-2 w-60 text-sm m-2">
                <CiDiscount1 style={{ color: "brown", fontSize: "40px" }} />{" "}
                <p className="px-2 text-base font-medium text-gray-500">
                  {description?.meta}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {restaurantMenu?.map((item) => {
        const itemCardsLength = item?.card?.card?.itemCards?.length;

        const dispatch = useDispatch();

        const handleAddItem = (info) => {
          dispatch(addItem(info));
        };
        const handleRemoveItem = (info) => {
          dispatch(removeItem(info));
        };
        return (
          <div className="w-3/5 my-4 border-b-4">
            <h2 className="text-xl font-bold" key={item?.card?.info?.id}>
              {item?.card?.card?.title}{" "}
              {itemCardsLength && <span>({itemCardsLength})</span>}
            </h2>

            {item?.card?.card?.itemCards?.map((list) => {
              const info = list?.card?.info;
            
              const price = String(info?.price);

              const slicedPrice = (price / 100).toFixed(2);
               

              return (
                <>
                <div
                  className="flex items-center justify-between my-2 border-b-2 py-4"
                  key={info?.id}
                >
                  <div className="">
                    <p className="text-medium font-semibold">{info?.name}</p>
                    <p className="flex items-center text-medium">
                      <FaRupeeSign />
                      {slicedPrice}
                    </p>
                    <p className="my-2 text-gray-400 w-[55%] ">
                      {info?.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      className="h-24 rounded-xl"
                      src={IMG_CDN_URL + list?.card?.info?.imageId}
                    />

                    {cartItems.filter((f) => f.id === info.id).length === 0 ? (
                      <button
                        className="px-2   mt-2 bg-white text-sm text-green-600 font-bold border border-gray-500"
                        onClick={() => {
                          handleAddItem(info);
                        }}
                      >
                        ADD
                      </button>
                    ) : (
                      <div className="flex items-center mt-2  bg-white text-green-600 font-bold border border-gray-500">
                        <button
                          className="mx-2 text-lg"
                          onClick={() => {
                            handleRemoveItem(info);
                          }}
                        >
                          -
                        </button>
                        <div>
                          {cartItems.filter((f) => f.id === info.id).length}
                        </div>
                        <button
                          className="mx-2 text-lg"
                          onClick={() => {
                            handleAddItem(info);
                          }}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
               
               {cartItems?.length > 0 && (
            <div className="flex justify-between fixed bottom-9 right-3 mb-12 mr-10">
              <span className="px-5 py-2 text-sm font-bold tracking-wide text-white rounded-full focus:outline-none"></span>
              <Link to="/cart">
                 
                <button className="flex items-center px-4 py-2 text-sm font-bold tracking-wide text-white bg-orange-500 rounded-full">
                  <BsFillCartFill style={{fontSize:"1.2rem",paddingRight:"5px"}}/> Cart - {''}
                  {cartItems.length}
                </button> 
              </Link>
            </div>
          )}
               
              </>
              );
            })}
          </div>
        );
      })}
      
    </div>
    
    
     
  );
};

export default RestaurantDetails;
