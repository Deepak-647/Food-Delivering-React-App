import React from "react";
import { IMG_CDN_URL } from "../constants";
import { AiFillStar } from "react-icons/ai";

const RestrauntCard = ({ data }) => {
  
  return (
    <div className="restraunt-card">
      <img alt="image" src={IMG_CDN_URL + data.cloudinaryImageId} />
      <div className="res-heading">{data.name}</div>
      <div className="res-cuisines">{data.cuisines.join(", ")}</div>
      <div className="res-card-footer">
        <div
          className={`res-rating ${
            data.avgRating > 4 ? "good-rating" : "average-rating"
          }`}
        >
          <AiFillStar />
          {data.avgRating}
        </div>
        <div className="res-distance">{data.sla.slaString}</div>
        <div className="res-cost">{data.costForTwo}</div>
      </div>
      <div className="quick-view">QUICK VIEW</div>
    </div>
   
  );
};
export default RestrauntCard;
