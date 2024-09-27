import React  from "react";
import Shimmer from "./Shimmer";
import "./RestaurantMenu.css";
import { useParams } from "react-router-dom";
import {
  MENU_ITEM_IMG,
} from "../utils/constant";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

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

  const menuItems =
    resInfo.cards[5].groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
      ?.itemCards || [];

  const menuItemsElse =
    resInfo.cards[5].groupedCard?.cardGroupMap?.REGULAR?.cards[7]?.card?.card
      ?.itemCards || [];

  const stripHtml = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerText || tempDiv.textContent;
  };

  return (
    <div className="menu-container">
      <div className="title-card">
        <h2>{name}</h2>
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
      <div className="restro-menu-list">
        <ul>
          <hr
            style={{
              height: "12px",
              marginBottom: "20px",
              backgroundColor: "#f0f0f0",
              border: "none",
            }}
          />

          {Array.isArray(menuItems) && menuItems.length > 0
            ? menuItems.map((res) => (
                <React.Fragment key={res?.card?.info?.id}>
                  <div className="each-menu-item">
                    <div className="menu-item-text">
                      <li
                        key={res?.card?.info?.id}
                        style={{ marginBottom: "20px" }}
                      >
                        <div
                          style={{ marginBottom: "5px", fontWeight: "bold" }}
                        >
                          {res?.card?.info?.name} <br></br>
                        </div>
                        <div style={{ marginBottom: "5px" }}>
                          ₹{res?.card?.info?.price / 100}
                          <br></br>
                        </div>
                        <div style={{ marginBottom: "5px", width: "50%" }}>
                          {res?.card?.info?.description}
                        </div>
                      </li>
                    </div>
                    <div className="menu-item-img">
                      <img
                        src={MENU_ITEM_IMG + res?.card?.info?.imageId}
                        alt="menu-img"
                        className="menuitemimg"
                      />
                    </div>
                  </div>
                  <hr style={{ margin: "10px 0" }} />
                </React.Fragment>
              ))
            : menuItemsElse.map((res) => (
                <li key={res?.card?.info?.id}>{res?.card?.info?.name}</li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
