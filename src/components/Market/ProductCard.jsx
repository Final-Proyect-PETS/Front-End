import React from "react";
import cart from "../../assets/images/shopping-cart.png";

export default function ProductCard({ id, name, price, image, stock }) {
  return (
    <div className="flex rounded-lg border shadow-md">
      <img
        src={image}
        alt=""
        className="w-48 rounded-lg rounded-t-lg lg:h-auto lg:rounded-none lg:rounded-l-lg"
      />
      <div className="w-60 bg-white border-l flex flex-col justify-around pl-5">
        <h1 className="text-xl font-semibold">{name}</h1>
        <h2>${price}</h2>
        <div className="flex justify-between">
          <h3 className="opacity-2">Stock: {stock}</h3>
          <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded mr-3">Agregar</button>
        </div>
      </div>
    </div>
  );
}
