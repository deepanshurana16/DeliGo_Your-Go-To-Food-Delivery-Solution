import RestrauntCard from "./RestrauntCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import OfflinePage from './OfflinePage'; // If Body.js is in the 'components' folder


const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setfilteredRestaurants] = useState([]);
  const [searchBar, setsearchBar] = useState("");

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/mapi/homepage/getCards?lat=19.232476&lng=72.975436"
      );
      const json = await data.json();

      const restro =
        json?.data?.success?.cards?.[3]?.gridWidget?.gridElements?.infoWithStyle
          ?.restaurants || []; // Default to empty array if undefined

      console.log(restro);
      setListOfRestaurants(restro);
      setfilteredRestaurants(restro);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setsearchBar(searchText);

    const filteredRestro = listOfRestaurants.filter((res) =>
      res.info?.name?.toLowerCase().includes(searchText)
    );

    setfilteredRestaurants(
      filteredRestro.length > 0 ? filteredRestro : listOfRestaurants
    );
  };

  const clearSearch = () => {
    setfilteredRestaurants(listOfRestaurants);
    setsearchBar("");
  };

  const filterRestro = () => {
    const filteredList = listOfRestaurants.filter(
      (res) => res.info?.avgRating > 4.4
    );
    setfilteredRestaurants(filteredList);
  };

  let onlineStatusSite = useOnlineStatus();

  if (!onlineStatusSite) {
    return <OfflinePage />
  } else {
    return (
      <div className="body-container">
        <div className="top-body">
          <div className="search">
            <input
              type="search"
              className="filter-btn"
              value={searchBar}
              onChange={handleSearch}
              placeholder="Search for restaurants"
            />
          </div>
          <div className="btns">
            <button className="clrsrch" onClick={clearSearch}>
              Clear Search
            </button>
            <button className="filterrestro" onClick={filterRestro}>
              Filter Restaurants
            </button>
          </div>
        </div>
        <div className="card-container">
          {filteredRestaurants && filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <Link
                key={restaurant.info?.id}
                to={"/restaurant/" + restaurant?.info?.id}
              >
                <RestrauntCard resData={restaurant} />
              </Link>
            ))
          ) : (
            <Shimmer />
          )}
        </div>
      </div>
    );
  }
};

export default Body;
