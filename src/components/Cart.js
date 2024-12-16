import { useState } from "react";
import { useSelector } from "react-redux";
import  RestaurantCategoryAccordianBody from "./RestaurantCategoryAccordianBody";

const Cart = () => {
  let cartItems = useSelector((store)=>store.cart.items);
  const [cartProducts,setcartProducts] = useState([...cartItems]);
  console.log(cartItems);
  console.log(cartProducts);

  function clearcart(){
    setcartProducts([]);
  }

  return (
    <>
    <div className="flex flex-col text-center justify-center items-center">
    <div className="font-bold text-3xl p-4 flex">
      <h1 className="mr-4">Cart </h1>
      <button type="button" class="text-white bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={clearcart}>Clear Cart</button>
    </div>
    <div className="text-center m-0 p-0">
    {cartProducts.length > 0 ? (
            cartProducts.map((res) => (
              <RestaurantCategoryAccordianBody
                key={res.bodydata.id} 
                bodydata={res.bodydata}
              />
            ))
          ) : (
            <p>Your cart is empty.</p> 
          )}
    </div>
    </div>
    </>
  );
};

export default Cart;
