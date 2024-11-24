import React, { useState } from "react";
import Shimmer from "./Shimmer";
import "./RestaurantMenu.css";
import { useParams } from "react-router-dom";
import {
  MENU_CATEGORY,
} from "../utils/constant";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategoryAccordian from "./RestaurantCategoryAccordian";

const RestaurantMenu = () => {
  const[showIndex, setshowIndex] = useState(null);
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  const dummy = "dummy";

  // Show loading placeholder until data is fetched
  if (!resInfo || !resInfo.cards || !resInfo.cards[2]?.card?.card?.info) {
    return <Shimmer />;
  }

  const {
    name,
    avgRating,
    cuisines,
    costForTwoMessage,
    totalRatingsString,
    sla: { deliveryTime },
    expectationNotifiers,
  } = resInfo.cards[2].card.card.info;

  // const menuItems =
  //   resInfo.cards[5].groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
  //     ?.itemCards || [];

  // const menuItemsElse =
  //   resInfo.cards[5].groupedCard?.cardGroupMap?.REGULAR?.cards[7]?.card?.card
  //     ?.itemCards || [];

  const stripHtml = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerText || tempDiv.textContent;
  };

  // console.log(resInfo.cards[5].groupedCard.cardGroupMap.REGULAR.cards.filter((res)=>res.card?.card?.["@type"]?.includes(MENU_CATEGORY)));
  const menuCategories =
    resInfo.cards[5].groupedCard.cardGroupMap.REGULAR.cards.filter((res) =>
      res.card?.card?.["@type"]?.includes(MENU_CATEGORY)
    );

    const handleAccordionClick = (index) => {
      if (index === showIndex) {
        setshowIndex(null);
      } else {
        setshowIndex(index);
      }
    };


  return (
    <div className="menu-container">
      <div className="title-card">
        <h2 className="font-bold text-lg">{name}</h2>
        <div className="info-title-card">
          <h4>
            {avgRating} ({totalRatingsString}) • {costForTwoMessage}{" "}
          </h4>
          <h4>{cuisines?.join(", ")}</h4>
          <h4>{deliveryTime} mins</h4>
          <hr
            style={{ height: "0.1px", backgroundColor: "#ccc", border: "none" }}
          />
          <h4>
            {expectationNotifiers?.[0]?.enrichedText &&
              stripHtml(expectationNotifiers[0].enrichedText)}
          </h4>
        </div>
      </div>

      {/* Accordian Categories*/}

      {menuCategories.map((res, index) => (
        <RestaurantCategoryAccordian
          key={index}
          data={res.card.card}
          dropdownstatus={index===showIndex && true}
          setshowIndex={()=>handleAccordionClick(index)}
          dummy = {dummy}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
