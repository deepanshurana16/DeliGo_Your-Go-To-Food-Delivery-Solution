import RestaurantCategoryAccordianBody from "./RestaurantCategoryAccordianBody";

const RestaurantCategoryAccordian = (props) => {
  const { data,dropdownstatus,setshowIndex,dummy } = props;
  const { title, itemCards } = data;

  function dropdown(){
      setshowIndex();
  }


  return (
    <div className="my-4 ">
      <div
        className="flex justify-between w-full bg-gray-50 shadow-lg p-4 text-md cursor-pointer"
        onClick={dropdown}
      >
        {/*Header*/}
        <span className="font-bold">
          {title} ({itemCards.length})
        </span>
        <span>⬇️</span>
      </div>
      {/*Body*/}

      {dropdownstatus &&
        itemCards.map((res) => (
          <RestaurantCategoryAccordianBody
            key={res.card.info.id}
            bodydata={res.card.info}
            dummy = {dummy}
          />
        ))}
    </div>
  );
};

export default RestaurantCategoryAccordian;
