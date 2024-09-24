import { RESTRAUNT_CARD_IMG } from "../utils/constant";

const RestrauntCard = (props) => {
  const { resData } = props;
  const {
    cloudinaryImageId,
    name,
    cuisines,
    costForTwo,
    avgRating,
    areaName,
  } = resData?.info;

  const{deliveryTime} = resData.info.sla;

  const cuisinesToDisplay = cuisines.length >3 ? cuisines.slice(0,3).join(",") : cuisines.join(",");

  return (
    <div className="card-component">
      <img
        src={
          RESTRAUNT_CARD_IMG +
          cloudinaryImageId
        }
        alt="meghanafoods"
        className="foodimg"
      />
      <h3>{name}</h3>
      <h4>{areaName}</h4>
      <h4>{cuisinesToDisplay}</h4>
      <h4>{costForTwo}</h4>
      <h4>{avgRating}⭐️</h4>
      <h4>{deliveryTime} mins</h4>
    </div>
  );
};

export default RestrauntCard;
