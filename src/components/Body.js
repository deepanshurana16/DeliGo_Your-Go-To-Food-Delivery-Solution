import RestrauntCard, { isPromoted } from "./RestrauntCard";
import { useEffect, useState,useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import OfflinePage from "./OfflinePage"; 
import UserContext from "../utils/UserContext";

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
      // console.log(json);
      const restro =
        json?.data?.success?.cards?.[3]?.gridWidget?.gridElements?.infoWithStyle
          ?.restaurants || [];

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

  const PromotedRestaurantCard = isPromoted(RestrauntCard);

  const {loggedInUser,setusername} = useContext(UserContext);


  if (!onlineStatusSite) {
    return <OfflinePage />;
  } else {
    return (
      <div className="body-container my-4">
        <div className="flex justify-center">
          <div className="px-4 mx-4 py-2">
            <input
              type="search"
              className="border border-solid border-black"
              value={searchBar}
              onChange={handleSearch}
            />
          </div>
          <div className="btns">
            <button
              className="border border-solid mx-4 px-4 py-2 rounded-lg bg-green-100"
              onClick={clearSearch}
            >
              Clear Search
            </button>
            <button
              className="border border-solid mx-4 px-4 py-2 rounded-lg bg-sky-100"
              onClick={filterRestro}
            >
              Filter Restaurants
            </button>
          </div>
          <div className="mx-4 px-4 py-2">
            <label className="font-bold">UserName : </label>
            <input type="text" className="border border-black" value={loggedInUser} onChange={(e)=>setusername(e.target.value)} />
          </div>
        </div>
        <div className="py-1 flex flex-wrap justify-between">
          {filteredRestaurants && filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <Link
                key={restaurant.info?.id}
                to={"/restaurant/" + restaurant?.info?.id}
              >
                {restaurant.info?.promoted === true ? (
                  <PromotedRestaurantCard resData={restaurant} />
                ) : (
                  <RestrauntCard resData={restaurant} />
                )}
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
