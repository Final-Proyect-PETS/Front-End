import React from "react";
import cart from "../../assets/images/shopping-cart.png";

export default function ProductCard({
  id,
  name,
  price,
  image,
  stock,
  quantity,
}) {
  return (
    <div className="flex rounded-lg border shadow-md">
      <img
        src={image}
        alt=""
        className="w-48 rounded-lg rounded-t-lg lg:h-auto lg:rounded-none lg:rounded-l-lg"
      />
      <div className="w-60 bg-white border-l flex flex-col justify-around pl-5">
        <h1 className="text-xl font-semibold">
          {name} x {quantity} unidades
        </h1>
        <h2>${price} x unidad </h2>

        <h3 className="opacity-2">Unidades disponibles: {stock}</h3>
        <div className="flex justify-between">
          <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded mr-3">
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
