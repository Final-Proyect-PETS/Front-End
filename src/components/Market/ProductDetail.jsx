import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../redux/Actions";
import NavBar from "../NavBar/NavBar";

export default function ProductDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const product = useSelector((state) => state.productDetail);

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch]);

  return (
    Object.keys(product).length ? (
      <section className="flex flex-col h-full items-center">
      <NavBar />
      <div className="m-32 flex flex-col lg:flex lg:flex-row w-full lg:w-2/3 h-full lg:h-96 bg-yellow-800 rounded-lg ring-2 ring-yellow-600">
        <div className="w-full lg:w-2/3 flex flex-col items-center lg:flex lg:flex-row">
          <div className="w-1/2 flex justify-center items-center">
            <img src={product?.image} alt="" />
          </div>
          <div className="w-1/2 h-full gap-6 lg:gap-0 flex flex-col items-center justify-around">
            <h1 className="font-semibold text-white text-2xl">
              {product?.name}
            </h1>
            <h1 className="font-semibold text-white text-2xl">
              $ {product?.price}
            </h1>
            <h2 className="font-semibold text-white">{product?.description}</h2>
            <h3 className="font-semibold text-gray-400">
              {product?.stock} en stock
            </h3>
          </div>
        </div>
        <div className="w-full lg:w-1/3 border-l mt-10 lg:mt-0 border-yellow-400 flex flex-col items-center justify-around gap-10 lg:gap-0">
          <h3 className="font-semibold text-white">En {product?.place}</h3>
          <h2 className="font-semibold text-white">
            Vendido por {product?.user[0]?.first_name} {product?.user[0]?.last_name}
          </h2>
          <button className="py-2 w-1/2 px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
            Comprar
          </button>
          <button className="py-2 w-1/2 px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
            Añadir al carrito
          </button>
        </div>
      </div>
    </section>
    ) : (
      <></>
    )
  );
}
