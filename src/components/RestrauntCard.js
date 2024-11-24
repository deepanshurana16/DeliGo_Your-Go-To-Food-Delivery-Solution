import { RESTRAUNT_CARD_IMG } from "../utils/constant";
import UserContext from "../utils/UserContext";
import { useContext } from "react";

const RestrauntCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, costForTwo, avgRating, areaName } =
    resData?.info;

  const { deliveryTime } = resData.info.sla;

  const cuisinesToDisplay =
    cuisines.length > 2 ? cuisines.slice(0, 2).join(",") : cuisines.join(",");
  const nameToDisplay = name.length > 20 ? name.slice(0, 20) + "..." : name;

  const {loggedInUser} = useContext(UserContext);

  return (
    <div className="h-[444px] w-52 my-2 rounded-[30px] bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
      <img
        src={RESTRAUNT_CARD_IMG + cloudinaryImageId}
        alt="meghanafoods"
        className="h-56 w-full p-2 rounded-[30px]"
      />
      <h3 className="text-xl my-1 mx-4 font-bold">{nameToDisplay}</h3>
      <h4 className="text-lg my-1 mx-4 font-semibold">{areaName}</h4>
      <h4 className="text-lg my-1 mx-4 font-semibold">{cuisinesToDisplay}</h4>
      <h4 className="text-lg my-1 mx-4 font-semibold">{costForTwo}</h4>
      <h4 className="text-lg mx-4 font-semibold">{avgRating}⭐️</h4>
      <h4 className="text-lg my-1 mx-4 font-semibold">{deliveryTime} mins</h4>
      <h4 className="text-lg my-1 mx-4 font-semibold">{loggedInUser}</h4>

    </div>
  );
};

//higher order component, taking in restaurantcard component as a input and passing another updated component isPromoted component as output
export const isPromoted = (RestrauntCard) => {
  return (props) => {
    return (
      <div className="">
        <label className="absolute bg-black text-zinc-100 m-2 p-2 rounded-md">Promoted</label>
        <RestrauntCard {...props} />
      </div>
    );
  };
};

export default RestrauntCard;
