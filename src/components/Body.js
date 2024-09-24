import RestrauntCard from "./RestrauntCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setfilteredRestaurants] = useState([]);
  const [searchBar, setsearchBar] = useState("");

  // Whenever state variables update, react triggers a reconciliation cycle (re-renders the component)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/mapi/homepage/getCards?lat=19.232476&lng=72.975436"
    );

    const json = await data.json();
    const restro =
      json?.data?.success?.cards[1]?.gridWidget?.gridElements?.infoWithStyle
        ?.restaurants;
    console.log(restro);
    setListOfRestaurants(restro);
    setfilteredRestaurants(restro);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setsearchBar(searchText);
    const filteredRestro = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText)
    );
    filteredRestro.length > 0
      ? setfilteredRestaurants(filteredRestro)
      : setfilteredRestaurants(listOfRestaurants);
  };

  const clearSearch = () => {
    // console.log("Btn clicked")
    setfilteredRestaurants(listOfRestaurants);
    setsearchBar("");
  };

  const filterRestro = () => {
    let filteredList = listOfRestaurants.filter(
      (res) => res.info.avgRating > 4.4
    );
    setfilteredRestaurants(filteredList);
  };

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
        {filteredRestaurants.length !== 0 ? (
          filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant.info?.id}
              to={"/restaurant/" + restaurant.info?.id}
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
};

export default Body;
