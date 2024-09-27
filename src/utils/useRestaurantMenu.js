import {
  RESTAURANT_URL,
} from "../utils/constant";
import { useState,useEffect } from "react";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const fetchedData = await fetch(RESTAURANT_URL + resId);
        const jsonFetchedData = await fetchedData.json();
        setResInfo(jsonFetchedData.data);
        console.log(jsonFetchedData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMenu();
  }, [resId]);


  return resInfo;
};

export default useRestaurantMenu;
