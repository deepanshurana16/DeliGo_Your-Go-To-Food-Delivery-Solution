import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { RESTAURANT_URL } from "../utils/constant";

const RestaurantMenu = () => {
  const [resInfo, setresInfo] = useState(null);

  const {resId} = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const restromenu = await fetch(
     RESTAURANT_URL + resId
    );
    const jsonmenu = await restromenu.json();
    console.log(jsonmenu);
    setresInfo(jsonmenu.data);
  };

  if(resInfo === null){
   return <Shimmer />
  }

  const {name,costForTwoMessage,cuisines} = resInfo?.cards[2]?.card?.card?.info;

const itemCards = resInfo?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card?.card?.itemCards;
const itemCardsTitle = resInfo?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card?.card;



console.log(itemCards);

  return (
    <div className="menucontainer">
      <img src="" alt="" />
      <h1>{name}</h1>
      <h2>{cuisines.join(", ")} - {costForTwoMessage}</h2>
      <h2>Menu</h2>
      <h3>{itemCardsTitle.title}</h3>
      <ul>
          {itemCards.map((res)=>(
              <li key={res?.card?.info?.id}>{res?.card?.info?.name} ₹{res?.card?.info?.finalPrice/100 || 
              res?.card?.info?.defaultPrice/100 ||res?.card?.info?.price/100 }</li>
          ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
