import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMG_CDN_URL } from "../constants";
import { clearCart } from "../utils/cartSlice";
import OrderNotification from "./OrderNotification";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const [orderNotification,setOrderNotification] =useState(false);

 const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
     
  };

 const handlePlaceOrder =()=>{
    dispatch(clearCart())
    setOrderNotification(true);
 }
  let uniqueFoodItems = [];
  if (cartItems.length > 0) {
    let uniqueItems = [...new Set(cartItems)];

    uniqueFoodItems = uniqueItems.map((value) => [
      value,
      cartItems.filter((item) => item === value).length,
    ]);
  }

  const totalPrice =
    cartItems.length > 0
      ? cartItems
          .map((item) => item.price > 0 && item.price / 100)
          .reduce((sum, a) => sum + a, 0)
      : 0;
  const finalPrice = (totalPrice + 29 + 49).toFixed();

  return (
    <div className="flex flex-col items-center">
      {cartItems?.length > 0 && (
        <div className="mt-4 text-center text-lg font-bold">
          <h3 className="fw-bolder">Cart items - {cartItems.length}</h3>
        </div>
      )}

      {cartItems?.length == 0 && (
        <div className="mt-4  flex flex-col items-center mb-24">
          <img className="h-44 mt-14" src="https://cdn-icons-png.flaticon.com/512/4555/4555971.png"/>
          <h1 className="font-bold text-2xl mt-14">Cart Empty</h1>
          <h2 className="mt-2 font-semibold text-2xl">
            You can go to{" "}
            <a href="/" className="font-bold text-orange-600">
              Home Page
            </a>{" "}
            to view more restaurants.
          </h2>
        </div>
      )}
     
        {Object.values(uniqueFoodItems).map((item, index) => {
          const itemPrice = item[0].price / 100;
          const itemQty = item[1];
          return (
            <>
             <div className="border-b-4 w-[55%]">
              <div className="flex my-4 items-center justify-between py-2  border-b-2">
                <div className="w-[60%]">
                  <h3 className="text-lg ">{item[0].name} - </h3>
                  <div className="flex text-gray-600 font-medium">
                    <div className="flex items-center my-2 text-base ml-0">
                      <p className="px-2">[qty : {itemQty}]</p>
                      <span>₹</span> {itemPrice * itemQty}
                    </div>
                  </div>
                </div>
                <div>
                  <img
                    className="h-[85] rounded-md"
                    alt="res-img"
                    src={IMG_CDN_URL + item[0]?.imageId}
                  />
                </div>
              </div>
              </div>
            </>
          );
        })}
     

      {cartItems.length > 0 ? (
        <>
        <div className="flex flex-col w-[55%] my-4 border-b-2 border-b-black">
          <div className="w-[50%]">
            <h2>Bill Details</h2>
            <div className="my-2">
              <div className="flex items-center justify-between">
                <p>Item Total</p>{" "}
                <span className="mx-10">{`₹${totalPrice}`}</span>
              </div>
              <div className="flex items-center justify-between">
                <p>Delivery Fee</p> <span className="mx-10">₹29</span>
              </div>
              <div className="flex items-center justify-between">
                <p>GST and Restaurant Charges</p>
                <span className="mx-10">₹49</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[55%] mb-6">
            <div className=" flex justify-between font-bold">
                <div className="flex w-[15%] justify-between">
                <h2>TO PAY</h2>
                <span>₹{finalPrice}</span>
                </div>
            
            <div>
                <button className="bg-orange-600 text-white mx-1 px-2" onClick={()=> handleClearCart()}>Clear Cart</button>
                <button className="bg-green-700 text-white mx-1 px-2" onClick={() => {
              handlePlaceOrder();
            }}>Place Order</button>
            </div>
            </div>
            
        </div>
        </>
      ) : (
        [null]
      )}
      {orderNotification  && <OrderNotification/>}
    </div>
  );
};

export default Cart;
