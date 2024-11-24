import { useDispatch } from "react-redux";
import { MENU_ITEM_IMG } from "../utils/constant";
import { addItems } from "../utils/reduxSlices/cartSlice";

const RestaurantCategoryAccordianBody = (props) => {
  const { bodydata,dummy } = props;

  const {
    name,
    imageId,
    price,
    // ratings: {
    //   aggregatedRating: { rating },
    // },
    defaultPrice,
    description,
  } = bodydata;

  //dispatching an action
  const dispatch = useDispatch();

  const handleAdd =(bodydata)=>{
    //dispatching the action
    dispatch(addItems({bodydata}));
    console.log(bodydata)
  }

  return (
    <div className="flex justify-between w-full bg-gray-50 p-4 text-md">
      <div className="flex-row w-6/12">
        <h4 className="my-2 font-bold">{name}</h4>
        <h4 className="my-2">₹{price / 100 || defaultPrice / 100}</h4>
        <h4>{description}</h4>
      </div>
      <div className="w-2/12 my-2 relative">
        {" "}
        <div className="relative">
          {" "}
          <img
            className="w-full rounded-xl"
            src={MENU_ITEM_IMG + imageId}
            alt="menu-img"
          />
          <div className="absolute left-8 top-[5em] w-[100%] "> 
            <button className="bg-black text-white px-2 py-1 rounded" onClick={()=>handleAdd(bodydata)}>ADD +</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCategoryAccordianBody;
